import { router, publicProcedure, rbacProcedure } from "../trpc";
import { z } from "zod";
import { dataGate, PublishStatus, type Prisma } from "@softcapphyjas/db";
import { TRPCError } from "@trpc/server";

export const coursesRouter = router({
  list: publicProcedure
    .input(
      z
        .object({
          category: z.string().optional(),
          level: z.string().optional(),
          search: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const baseWhere: Prisma.CourseWhereInput = {};
      if (input?.category) {
        baseWhere.category = input.category;
      }
      if (input?.level) {
        baseWhere.level = input.level;
      }
      if (input?.search) {
        baseWhere.OR = [
          { title: { contains: input.search, mode: "insensitive" } },
          { description: { contains: input.search, mode: "insensitive" } },
        ];
      }

      const scopedWhere = dataGate.scopeCourses(ctx.session?.user, baseWhere);

      return await ctx.prisma.course.findMany({
        where: scopedWhere,
        include: {
          instructor: {
            select: { id: true, name: true, image: true },
          },
          _count: {
            select: { modules: true, enrollments: true },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    }),

  getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const scopedWhere = dataGate.scopeCourses(ctx.session?.user, {
      id: input.id,
    });

    const course = await ctx.prisma.course.findFirst({
      where: scopedWhere,
      include: {
        instructor: {
          select: { id: true, name: true, image: true },
        },
        modules: {
          include: {
            lessons: {
              include: {
                quiz: true,
              },
              orderBy: { position: "asc" },
            },
          },
          orderBy: { position: "asc" },
        },
      },
    });

    if (!course) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Course not found or access denied",
      });
    }

    return course;
  }),

  create: rbacProcedure("write", "lms")
    .input(
      z.object({
        slug: z.string(),
        title: z.string(),
        subtitle: z.string().optional(),
        description: z.string(),
        category: z.string(),
        level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
        priceInPaise: z.number().int().nonnegative(),
        durationMinutes: z.number().int().positive().default(120),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.course.create({
        data: {
          slug: input.slug,
          title: input.title,
          description: input.description,
          category: input.category,
          level: input.level,
          priceInPaise: input.priceInPaise,
          durationMinutes: input.durationMinutes,
          status: PublishStatus.DRAFT,
          instructorId: ctx.session.user.id,
          ...(input.subtitle ? { subtitle: input.subtitle } : {}),
        },
      });
    }),
});
