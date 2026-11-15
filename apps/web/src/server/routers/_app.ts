import { router } from "../trpc";
import { authRouter } from "./auth";
import { coursesRouter } from "./courses";
import { projectsRouter } from "./projects";
import { adminRouter } from "./admin";
import { studentRouter } from "./student";

export const appRouter = router({
  auth: authRouter,
  courses: coursesRouter,
  student: studentRouter,
  projects: projectsRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
