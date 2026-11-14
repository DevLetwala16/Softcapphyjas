import { Prisma, Role, PublishStatus } from "@prisma/client";

export interface DataGateUser {
  id: string;
  roles: Role[];
}

/**
 * Data Gate Query Scoping (Board 26 - Layer 3: Postgres row filters)
 * Generates Prisma where clauses based on the actor's roles and identity.
 */
export const dataGate = {
  /**
   * Scopes Course queries:
   * - Instructors only see courses they instruct (unless public)
   * - Students only see published courses
   * - Admins see all
   */
  scopeCourses(
    user?: DataGateUser | null,
    baseWhere?: Prisma.CourseWhereInput
  ): Prisma.CourseWhereInput {
    if (!user) {
      return { ...baseWhere, status: PublishStatus.PUBLISHED, deletedAt: null };
    }

    if (
      user.roles.includes(Role.SUPER_ADMIN) ||
      user.roles.includes(Role.ADMIN) ||
      user.roles.includes(Role.CONTENT_EDITOR)
    ) {
      return { ...baseWhere, deletedAt: null };
    }

    if (user.roles.includes(Role.INSTRUCTOR)) {
      return {
        ...baseWhere,
        deletedAt: null,
        OR: [{ instructorId: user.id }, { status: PublishStatus.PUBLISHED }],
      };
    }

    return { ...baseWhere, status: PublishStatus.PUBLISHED, deletedAt: null };
  },

  /**
   * Scopes Project queries:
   * - Clients only see projects where clientId === user.id
   * - Sales & Admins see all
   */
  scopeProjects(
    user: DataGateUser,
    baseWhere?: Prisma.ProjectWhereInput
  ): Prisma.ProjectWhereInput {
    if (
      user.roles.includes(Role.SUPER_ADMIN) ||
      user.roles.includes(Role.ADMIN) ||
      user.roles.includes(Role.SALES_MANAGER)
    ) {
      return { ...baseWhere, deletedAt: null };
    }

    if (user.roles.includes(Role.CLIENT)) {
      return { ...baseWhere, clientId: user.id, deletedAt: null };
    }

    // Default to strict empty match if no permission
    return { id: "__NO_ACCESS__" };
  },

  /**
   * Scopes Invoice queries:
   * - Clients only see invoices for their own projects
   * - Finance & Admins see all
   */
  scopeInvoices(
    user: DataGateUser,
    baseWhere?: Prisma.InvoiceWhereInput
  ): Prisma.InvoiceWhereInput {
    if (
      user.roles.includes(Role.SUPER_ADMIN) ||
      user.roles.includes(Role.ADMIN) ||
      user.roles.includes(Role.FINANCE)
    ) {
      return { ...baseWhere };
    }

    if (user.roles.includes(Role.CLIENT)) {
      return {
        ...baseWhere,
        project: {
          clientId: user.id,
        },
      };
    }

    return { id: "__NO_ACCESS__" };
  },

  /**
   * Scopes Enrollment queries:
   * - Students only see their own enrollments
   * - Instructors see enrollments for their own courses
   * - Staff/Admins see all
   */
  scopeEnrollments(
    user: DataGateUser,
    baseWhere?: Prisma.EnrollmentWhereInput
  ): Prisma.EnrollmentWhereInput {
    if (user.roles.includes(Role.SUPER_ADMIN) || user.roles.includes(Role.ADMIN)) {
      return { ...baseWhere };
    }

    if (user.roles.includes(Role.INSTRUCTOR)) {
      return {
        ...baseWhere,
        course: { instructorId: user.id },
      };
    }

    if (user.roles.includes(Role.STUDENT)) {
      return { ...baseWhere, userId: user.id };
    }

    return { id: "__NO_ACCESS__" };
  },
};
