import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { type Context } from "./context";
import { can, isStaff, type Action, type Resource } from "@softcapphyjas/auth";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof Error ? error.cause.message : null,
      },
    };
  },
});

export const router = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;

/**
 * Reusable middleware that checks if user is logged in
 */
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Authentication required to access this resource",
    });
  }
  return next({
    ctx: {
      ...ctx,
      session: {
        ...ctx.session,
        user: ctx.session.user,
      },
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);

/**
 * Reusable middleware that checks if user is staff and has passed MFA
 */
const isStaffWithMfa = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Authentication required",
    });
  }

  const user = ctx.session.user;
  if (!isStaff(user)) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Staff clearance required",
    });
  }

  if (user.mfaEnabled && !user.mfaPassed) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Multi-Factor Authentication required",
    });
  }

  return next({
    ctx: {
      ...ctx,
      session: {
        ...ctx.session,
        user,
      },
    },
  });
});

export const staffProcedure = t.procedure.use(isStaffWithMfa);

/**
 * RBAC procedure factory: Layer 2 API Gate (Master Spec §7.2 & Board 26)
 * Checks can(ctx.session.user, action, resource, context)
 */
export function rbacProcedure(
  action: Action,
  resource: Resource,
  contextFn?: (ctx: Context) => Record<string, unknown>
) {
  return protectedProcedure.use(async ({ ctx, next }) => {
    const user = ctx.session.user;
    const authContext = contextFn ? contextFn(ctx) : undefined;
    const allowed = can(user, action, resource, authContext);

    if (!allowed) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: `RBAC Permission Denied: Cannot perform '${action}' on '${resource}'`,
      });
    }

    return next({ ctx });
  });
}
