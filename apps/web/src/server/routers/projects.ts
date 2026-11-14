import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { dataGate } from "@softcapphyjas/db";
import { TRPCError } from "@trpc/server";

export const projectsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const scopedWhere = dataGate.scopeProjects(ctx.session.user);

    return await ctx.prisma.project.findMany({
      where: scopedWhere,
      include: {
        milestones: {
          orderBy: { dueDate: "asc" },
        },
        invoices: true,
        _count: {
          select: { files: true },
        },
      },
      orderBy: { updatedAt: "desc" },
    });
  }),

  getById: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const scopedWhere = dataGate.scopeProjects(ctx.session.user, {
      id: input.id,
    });

    const project = await ctx.prisma.project.findFirst({
      where: scopedWhere,
      include: {
        milestones: {
          orderBy: { dueDate: "asc" },
        },
        files: true,
        invoices: true,
      },
    });

    if (!project) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Project not found or unauthorized",
      });
    }

    return project;
  }),
});
