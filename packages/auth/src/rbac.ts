import { Role } from "@softcapphyjas/db";

export type Action = "read" | "write" | "approve" | "delete";

export type Resource =
  | "users"
  | "cms"
  | "lms"
  | "student_crm"
  | "client_crm"
  | "payments"
  | "hr_core"
  | "analytics"
  | "audit_logs"
  | "learning_player"
  | "client_portal";

export interface AuthUser {
  id: string;
  email?: string | null;
  roles: Role[];
  mfaPassed?: boolean;
}

export interface ResourceContext {
  ownerId?: string;
  instructorId?: string;
  clientId?: string;
  authorId?: string;
  assigneeId?: string;
  employeeUserId?: string;
  userId?: string;
  courseId?: string;
  enrolledCourseIds?: string[];
  [key: string]: unknown;
}

export const STAFF_ROLES: Role[] = [
  Role.SUPER_ADMIN,
  Role.ADMIN,
  Role.HR_MANAGER,
  Role.HR_EXECUTIVE,
  Role.RESEARCHER,
  Role.INSTRUCTOR,
  Role.CONTENT_EDITOR,
  Role.ENGINEER,
  Role.SALES_MANAGER,
  Role.FINANCE,
  Role.EMPLOYEE,
];

export function isStaff(user: AuthUser | null | undefined): boolean {
  if (!user || !user.roles) return false;
  return user.roles.some((r) => STAFF_ROLES.includes(r));
}

export function hasRole(user: AuthUser | null | undefined, ...requiredRoles: Role[]): boolean {
  if (!user || !user.roles) return false;
  return user.roles.some((r) => requiredRoles.includes(r));
}

/**
 * Core RBAC Policy Engine: evaluates role permissions and attribute-based rules.
 * Reference: SOFTCAPPHYJAS Master Spec Section 7.2 & Excalidraw Board 26
 */
export function can(
  user: AuthUser | null | undefined,
  action: Action,
  resource: Resource,
  context?: ResourceContext
): boolean {
  if (!user || !user.roles || user.roles.length === 0) {
    return false;
  }

  const { roles, id: userId } = user;

  // SUPER_ADMIN has full permissions across all resources
  if (roles.includes(Role.SUPER_ADMIN)) {
    return true;
  }

  switch (resource) {
    case "users": {
      if (roles.includes(Role.ADMIN)) {
        return action === "read" || action === "write";
      }
      if (roles.includes(Role.HR_MANAGER) || roles.includes(Role.HR_EXECUTIVE)) {
        // HR scope: can read employee users
        return action === "read";
      }
      return false;
    }

    case "cms": {
      if (roles.includes(Role.ADMIN) || roles.includes(Role.CONTENT_EDITOR)) {
        return true; // RWA
      }
      if (roles.includes(Role.RESEARCHER)) {
        if (action === "read") return true;
        if (action === "write") {
          // Researcher can write/edit their own posts
          return !context?.authorId || context.authorId === userId;
        }
        return false;
      }
      if (roles.includes(Role.EMPLOYEE)) {
        return action === "read";
      }
      return false;
    }

    case "lms": {
      if (roles.includes(Role.ADMIN)) {
        return true; // RWA
      }
      if (roles.includes(Role.CONTENT_EDITOR)) {
        return action === "read" || action === "write";
      }
      if (roles.includes(Role.INSTRUCTOR)) {
        if (action === "read") return true;
        if (action === "write") {
          // Instructor can edit only courses they instruct
          return !context?.instructorId || context.instructorId === userId;
        }
        return false;
      }
      if (roles.includes(Role.EMPLOYEE)) {
        return action === "read";
      }
      return false;
    }

    case "student_crm": {
      if (roles.includes(Role.ADMIN) || roles.includes(Role.FINANCE)) {
        return action === "read" || action === "write";
      }
      if (roles.includes(Role.SALES_MANAGER)) {
        return action === "read";
      }
      if (roles.includes(Role.INSTRUCTOR)) {
        // Read own course students only
        return action === "read" && (!context?.instructorId || context.instructorId === userId);
      }
      return false;
    }

    case "client_crm": {
      if (roles.includes(Role.SALES_MANAGER)) {
        return true; // RWA
      }
      if (roles.includes(Role.ADMIN)) {
        return action === "read" || action === "write";
      }
      if (roles.includes(Role.FINANCE)) {
        return action === "read";
      }
      if (roles.includes(Role.CLIENT)) {
        // Clients can view own client CRM projects
        return action === "read" && (!context?.clientId || context.clientId === userId);
      }
      return false;
    }

    case "payments": {
      if (roles.includes(Role.FINANCE)) {
        return true; // RWA
      }
      if (roles.includes(Role.ADMIN) || roles.includes(Role.SALES_MANAGER)) {
        return action === "read";
      }
      return false;
    }

    case "hr_core": {
      if (roles.includes(Role.HR_MANAGER) || roles.includes(Role.HR_EXECUTIVE)) {
        return true; // RWA
      }
      if (roles.includes(Role.ADMIN)) {
        return action === "read";
      }
      if (roles.includes(Role.FINANCE)) {
        return action === "read"; // Payroll scope
      }
      if (roles.includes(Role.EMPLOYEE)) {
        // Employees can read their own attendance, reviews and tasks
        return action === "read" && (!context?.employeeUserId || context.employeeUserId === userId);
      }
      return false;
    }

    case "analytics": {
      if (roles.includes(Role.ADMIN)) {
        return true; // RWA
      }
      if (roles.includes(Role.FINANCE) || roles.includes(Role.SALES_MANAGER)) {
        return action === "read";
      }
      if (roles.includes(Role.HR_MANAGER) || roles.includes(Role.HR_EXECUTIVE)) {
        return action === "read";
      }
      if (roles.includes(Role.CONTENT_EDITOR)) {
        return action === "read";
      }
      if (roles.includes(Role.INSTRUCTOR)) {
        // Read own course analytics
        return action === "read" && (!context?.instructorId || context.instructorId === userId);
      }
      return false;
    }

    case "audit_logs": {
      if (roles.includes(Role.ADMIN)) {
        return action === "read";
      }
      return false;
    }

    case "learning_player": {
      // Must be a student and course must be in enrolledCourseIds if provided
      if (roles.includes(Role.STUDENT)) {
        if (action !== "read") return false;
        if (context?.courseId && context.enrolledCourseIds) {
          return context.enrolledCourseIds.includes(context.courseId);
        }
        return true;
      }
      return false;
    }

    case "client_portal": {
      if (roles.includes(Role.CLIENT)) {
        return !context?.clientId || context.clientId === userId;
      }
      return false;
    }

    default:
      return false;
  }
}

/**
 * Determine portal redirection based on user roles and MFA state
 * Reference: Board 18 & Board 26
 */
export function getPostLoginRedirect(user: AuthUser): string {
  if (!user || !user.roles || user.roles.length === 0) {
    return "/";
  }

  // If user has staff role, check MFA requirements
  if (isStaff(user)) {
    if (!user.mfaPassed) {
      return "/mfa";
    }
    return "/admin";
  }

  if (user.roles.includes(Role.STUDENT)) {
    return "/student-dashboard";
  }

  if (user.roles.includes(Role.CLIENT)) {
    return "/client-dashboard";
  }

  return "/";
}
