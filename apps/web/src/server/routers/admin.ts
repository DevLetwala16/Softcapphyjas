import { router, staffProcedure, rbacProcedure } from "../trpc";
import { z } from "zod";

export const adminRouter = router({
  getStats: staffProcedure.query(async ({ ctx }) => {
    const [userCount, courseCount, projectCount, orderCount] = await Promise.all([
      ctx.prisma.user.count({ where: { deletedAt: null } }),
      ctx.prisma.course.count({ where: { deletedAt: null } }),
      ctx.prisma.project.count({ where: { deletedAt: null } }),
      ctx.prisma.order.count(),
    ]);

    return {
      userCount,
      courseCount,
      projectCount,
      orderCount,
    };
  }),

  getAuditLogs: rbacProcedure("read", "audit_logs")
    .input(
      z
        .object({
          limit: z.number().min(1).max(100).default(50),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const limit = input?.limit ?? 50;
      return await ctx.prisma.auditLog.findMany({
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          actor: {
            select: { id: true, name: true, email: true, roles: true },
          },
        },
      });
    }),
});
