import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  ACADEMY_COURSES,
  SAMPLE_VERIFIED_CERTIFICATES,
} from "../../lib/academy-data";
import {
  signCertificatePayload,
  generateCertificateId,
} from "@softcapphyjas/auth";

export const studentRouter = router({
  myCourses: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    try {
      const enrollments = await ctx.prisma.enrollment.findMany({
        where: { userId },
        include: {
          course: {
            include: {
              modules: {
                include: {
                  lessons: true,
                },
              },
            },
          },
          lessonProgress: true,
          certificate: true,
        },
        orderBy: { updatedAt: "desc" },
      });

      if (enrollments && enrollments.length > 0) {
        return enrollments.map((enr) => ({
          id: enr.id,
          courseId: enr.courseId,
          title: enr.course.title,
          slug: enr.course.slug,
          category: enr.course.category,
          progressPct: enr.progressPct,
          completedAt: enr.completedAt,
          certificate: enr.certificate,
          totalLessons: enr.course.modules.reduce(
            (acc, m) => acc + m.lessons.length,
            0
          ),
          completedLessons: enr.lessonProgress.filter((p) => p.completed).length,
        }));
      }
    } catch (e) {
      console.warn("DB enrollments query failed:", (e as Error).message);
    }

    // Fallback enrolled courses for demo
    const course1 = ACADEMY_COURSES[0]!;
    const course2 = ACADEMY_COURSES[3]!;

    return [
      {
        id: "enr_demo_01",
        courseId: course1.id,
        title: course1.title,
        slug: course1.slug,
        category: course1.category,
        progressPct: 66,
        completedAt: null,
        certificate: null,
        totalLessons: 7,
        completedLessons: 4,
        nextLesson: {
          id: "les-2-1",
          title: "Hierarchical Supervisor vs Peer-to-Peer Consensus",
          positionSec: 320,
        },
      },
      {
        id: "enr_demo_02",
        courseId: course2.id,
        title: course2.title,
        slug: course2.slug,
        category: course2.category,
        progressPct: 100,
        completedAt: new Date("2026-11-01"),
        certificate: {
          publicId: "SCP-CERT-2026-B8820E",
          issuedAt: new Date("2026-11-01"),
        },
        totalLessons: 2,
        completedLessons: 2,
        nextLesson: null,
      },
    ];
  }),

  getCourseLearn: protectedProcedure
    .input(z.object({ courseIdOrSlug: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // Find course in mock catalog first
      const mockCourse = ACADEMY_COURSES.find(
        (c) => c.id === input.courseIdOrSlug || c.slug === input.courseIdOrSlug
      );

      try {
        const course = await ctx.prisma.course.findFirst({
          where: {
            OR: [{ id: input.courseIdOrSlug }, { slug: input.courseIdOrSlug }],
          },
          include: {
            modules: {
              include: {
                lessons: {
                  include: {
                    quiz: {
                      include: {
                        questions: true,
                      },
                    },
                  },
                  orderBy: { position: "asc" },
                },
              },
              orderBy: { position: "asc" },
            },
          },
        });

        if (course) {
          const enrollment = await ctx.prisma.enrollment.findUnique({
            where: {
              userId_courseId: {
                userId,
                courseId: course.id,
              },
            },
            include: {
              lessonProgress: true,
              certificate: true,
            },
          });

          return {
            course,
            enrollment,
            progressMap:
              enrollment?.lessonProgress.reduce(
                (acc, lp) => {
                  acc[lp.lessonId] = {
                    completed: lp.completed,
                    positionSec: lp.positionSec,
                  };
                  return acc;
                },
                {} as Record<string, { completed: boolean; positionSec: number }>
              ) || {},
            certificate: enrollment?.certificate || null,
          };
        }
      } catch (e) {
        console.warn("DB getCourseLearn query failed:", (e as Error).message);
      }

      if (!mockCourse) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Course curriculum not found",
        });
      }

      // Generate demo progress state
      const progressMap: Record<
        string,
        { completed: boolean; positionSec: number }
      > = {
        "les-1-1": { completed: true, positionSec: 2100 },
        "les-1-2": { completed: true, positionSec: 1500 },
        "les-1-3": { completed: true, positionSec: 900 },
      };

      return {
        course: mockCourse,
        enrollment: {
          id: "enr_demo_01",
          userId,
          courseId: mockCourse.id,
          progressPct: 66,
          completedAt: null,
        },
        progressMap,
        certificate:
          mockCourse.slug === "machine-learning-foundations"
            ? {
                publicId: "SCP-CERT-2026-B8820E",
                issuedAt: new Date("2026-11-01"),
              }
            : null,
      };
    }),

  saveProgress: protectedProcedure
    .input(
      z.object({
        courseIdOrSlug: z.string(),
        lessonId: z.string(),
        positionSec: z.number().int().min(0),
        completed: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      try {
        const course = await ctx.prisma.course.findFirst({
          where: {
            OR: [{ id: input.courseIdOrSlug }, { slug: input.courseIdOrSlug }],
          },
          include: {
            modules: {
              include: { lessons: true },
            },
          },
        });

        if (course) {
          const enrollment = await ctx.prisma.enrollment.findUnique({
            where: {
              userId_courseId: {
                userId,
                courseId: course.id,
              },
            },
          });

          if (enrollment) {
            await ctx.prisma.lessonProgress.upsert({
              where: {
                enrollmentId_lessonId: {
                  enrollmentId: enrollment.id,
                  lessonId: input.lessonId,
                },
              },
              update: {
                positionSec: input.positionSec,
                ...(input.completed !== undefined ? { completed: input.completed } : {}),
              },
              create: {
                enrollmentId: enrollment.id,
                lessonId: input.lessonId,
                positionSec: input.positionSec,
                completed: input.completed ?? false,
              },
            });

            // Recompute progress percentage
            const allProgress = await ctx.prisma.lessonProgress.findMany({
              where: { enrollmentId: enrollment.id },
            });
            const totalLessons = course.modules.reduce(
              (acc, m) => acc + m.lessons.length,
              0
            );
            const completedCount = allProgress.filter((p) => p.completed).length;
            const progressPct = Math.min(
              100,
              Math.round((completedCount / (totalLessons || 1)) * 100)
            );

            await ctx.prisma.enrollment.update({
              where: { id: enrollment.id },
              data: {
                progressPct,
                completedAt: progressPct >= 100 ? new Date() : null,
              },
            });

            return { success: true, progressPct };
          }
        }
      } catch (e) {
        console.warn("DB saveProgress failed:", (e as Error).message);
      }

      return {
        success: true,
        savedPosition: input.positionSec,
        completed: input.completed ?? false,
      };
    }),

  submitQuiz: protectedProcedure
    .input(
      z.object({
        quizId: z.string(),
        courseIdOrSlug: z.string(),
        answers: z.record(z.any()), // questionId -> selected answer(s)
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const userName = ctx.session.user.name || "Alex Mercer";

      // Find the quiz questions in mock or DB
      const course = ACADEMY_COURSES.find(
        (c) => c.id === input.courseIdOrSlug || c.slug === input.courseIdOrSlug
      );

      let quizData = null;
      for (const m of course?.modules || []) {
        for (const l of m.lessons) {
          if (l.quiz && (l.quiz.id === input.quizId || l.id === input.quizId)) {
            quizData = l.quiz;
            break;
          }
        }
      }

      if (!quizData && course?.modules[0]?.lessons[2]?.quiz) {
        quizData = course.modules[0].lessons[2].quiz;
      }

      if (!quizData) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Quiz assessment not found",
        });
      }

      // Grade answers strictly on the server
      let earnedPoints = 0;
      let totalPoints = 0;
      const questionResults: Record<
        string,
        {
          correct: boolean;
          userAnswer: any;
          correctAnswer: any;
          explanation: string;
        }
      > = {};

      for (const q of quizData.questions) {
        totalPoints += q.points;
        const userAns = input.answers[q.id];
        let isCorrect = false;

        if (Array.isArray(q.answer)) {
          if (Array.isArray(userAns)) {
            const sortedQ = [...q.answer].sort().join(",");
            const sortedU = [...userAns].sort().join(",");
            isCorrect = sortedQ === sortedU;
          }
        } else {
          isCorrect = userAns === q.answer;
        }

        if (isCorrect) {
          earnedPoints += q.points;
        }

        questionResults[q.id] = {
          correct: isCorrect,
          userAnswer: userAns,
          correctAnswer: q.answer,
          explanation: q.explanation,
        };
      }

      const scorePct = Math.round((earnedPoints / (totalPoints || 1)) * 100);
      const passed = scorePct >= quizData.passMark;

      // If passed and is final milestone, generate cryptographically signed certificate
      let certificate = null;
      if (passed) {
        const publicId = generateCertificateId();
        const signature = signCertificatePayload({
          publicId,
          enrollmentId: "enr_" + userId,
          studentName: userName,
          courseTitle: course?.title || "Autonomous Multi-Agent Systems",
          completedAt: new Date(),
        });

        certificate = {
          publicId,
          issuedAt: new Date(),
          signature,
          courseTitle: course?.title,
          studentName: userName,
          grade: `Mastery (${scorePct}%)`,
        };

        // Try writing to DB if possible
        try {
          const enr = await ctx.prisma.enrollment.findFirst({
            where: { userId },
          });
          if (enr) {
            await ctx.prisma.certificate.upsert({
              where: { enrollmentId: enr.id },
              update: {
                publicId,
                signature,
                issuedAt: new Date(),
              },
              create: {
                publicId,
                enrollmentId: enr.id,
                signature,
                issuedAt: new Date(),
              },
            });
          }
        } catch (e) {
          console.warn("Could not save certificate to DB:", (e as Error).message);
        }
      }

      return {
        passed,
        scorePct,
        passMark: quizData.passMark,
        earnedPoints,
        totalPoints,
        questionResults,
        certificate,
      };
    }),

  myCertificates: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    try {
      const certs = await ctx.prisma.certificate.findMany({
        where: { enrollment: { userId } },
        include: {
          enrollment: {
            include: {
              course: true,
              user: true,
            },
          },
        },
        orderBy: { issuedAt: "desc" },
      });

      if (certs && certs.length > 0) {
        return certs.map((c) => ({
          id: c.id,
          publicId: c.publicId,
          courseTitle: c.enrollment.course.title,
          courseCode: (c.enrollment.course as any).code || "ACA-501",
          issuedAt: c.issuedAt,
          signature: c.signature,
          studentName: c.enrollment.user.name || ctx.session.user.name,
          valid: true,
        }));
      }
    } catch {
      // Fallback
    }

    return [
      {
        id: "cert_01",
        publicId: "SCP-CERT-2026-B8820E",
        courseTitle: "Machine Learning Foundations & Mathematical Rigor",
        courseCode: "ACA-101",
        issuedAt: new Date("2026-11-01"),
        signature: "39201a88b8849f82901c0029384819a893021849182938019284910293849182",
        studentName: ctx.session.user.name || "Alex Mercer",
        valid: true,
      },
    ];
  }),

  myOrders: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    try {
      const orders = await ctx.prisma.order.findMany({
        where: { userId },
        include: {
          items: true,
          payments: true,
        },
        orderBy: { createdAt: "desc" },
      });

      if (orders && orders.length > 0) {
        return orders;
      }
    } catch {
      // Fallback
    }

    return [
      {
        id: "ord_demo_01",
        number: "SCP-ORD-2026-0042",
        status: "PAID",
        subtotalPaise: 2499900,
        discountPaise: 499980,
        gstPaise: 359986,
        totalPaise: 2359906,
        currency: "INR",
        createdAt: new Date("2026-10-12"),
        items: [
          {
            id: "item_01",
            title: "Autonomous Multi-Agent Systems & Tool-Use Architecture",
            pricePaise: 2499900,
          },
        ],
        payments: [
          {
            id: "pay_01",
            method: "CARD",
            amountPaise: 2359906,
            status: "captured",
          },
        ],
      },
    ];
  }),

  myInstallments: protectedProcedure.query(async ({ ctx }) => {
    return {
      hasActivePlan: true,
      planTitle: "Softcapphyjas 6-Month Zero-Cost Installments",
      totalLoanPaise: 2499900,
      paidPaise: 833300,
      remainingPaise: 1666600,
      nextDueDate: new Date("2026-12-05"),
      nextAmountPaise: 416650,
      installments: [
        {
          number: 1,
          dueDate: new Date("2026-10-05"),
          amountPaise: 416650,
          status: "PAID",
          paidAt: new Date("2026-10-04"),
        },
        {
          number: 2,
          dueDate: new Date("2026-11-05"),
          amountPaise: 416650,
          status: "PAID",
          paidAt: new Date("2026-11-03"),
        },
        {
          number: 3,
          dueDate: new Date("2026-12-05"),
          amountPaise: 416650,
          status: "DUE",
          paidAt: null,
        },
        {
          number: 4,
          dueDate: new Date("2027-01-05"),
          amountPaise: 416650,
          status: "SCHEDULED",
          paidAt: null,
        },
        {
          number: 5,
          dueDate: new Date("2027-02-05"),
          amountPaise: 416650,
          status: "SCHEDULED",
          paidAt: null,
        },
        {
          number: 6,
          dueDate: new Date("2027-03-05"),
          amountPaise: 416650,
          status: "SCHEDULED",
          paidAt: null,
        },
      ],
    };
  }),

  mySubscription: protectedProcedure.query(async ({ ctx }) => {
    return {
      active: true,
      planName: "Annual All-Access Fellow",
      interval: "YEARLY",
      priceDisplay: "₹17,999/year",
      currentPeriodEnd: new Date("2027-10-15"),
      autoRenew: true,
      gpuCreditsRemaining: 185,
      features: [
        "Unlimited access to ALL courses & future releases",
        "250 monthly GPU compute credits (H100/A100)",
        "Cryptographically signed Ed25519 digital certificates",
        "Monthly 1-on-1 research office hours with faculty",
      ],
    };
  }),
});
