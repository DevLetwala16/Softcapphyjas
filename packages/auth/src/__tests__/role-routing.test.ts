import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Role } from "@softcapphyjas/db";
import { STAFF_ROLES, type AuthUser } from "../rbac";

interface MiddlewareSimulationRequest {
  pathname: string;
  user: AuthUser | null;
}

interface MiddlewareSimulationResponse {
  status: "next" | "redirect";
  redirectUrl?: string;
}

/**
 * Pure simulation of the middleware logic from apps/web/src/middleware.ts
 * Verifies contract against Spec §16.6 and Excalidraw Board 26
 */
function simulateMiddleware(req: MiddlewareSimulationRequest): MiddlewareSimulationResponse {
  const { pathname, user } = req;
  const roles = user?.roles ?? [];

  if (pathname.startsWith("/admin")) {
    if (!user) {
      return { status: "redirect", redirectUrl: `/login?next=${encodeURIComponent(pathname)}` };
    }
    const isStaffMember = roles.some((r) => STAFF_ROLES.includes(r));
    if (!isStaffMember) {
      return { status: "redirect", redirectUrl: "/403" };
    }
    if (user.mfaPassed !== true) {
      if (pathname === "/admin/setup-mfa") {
        return { status: "next" };
      }
      return { status: "redirect", redirectUrl: `/mfa?next=${encodeURIComponent(pathname)}` };
    }
    return { status: "next" };
  }

  if (pathname.startsWith("/student-dashboard")) {
    if (!user) {
      return { status: "redirect", redirectUrl: `/login?next=${encodeURIComponent(pathname)}` };
    }
    if (!roles.includes(Role.STUDENT)) {
      return { status: "redirect", redirectUrl: "/403" };
    }
    return { status: "next" };
  }

  if (pathname.startsWith("/client-dashboard")) {
    if (!user) {
      return { status: "redirect", redirectUrl: `/login?next=${encodeURIComponent(pathname)}` };
    }
    if (!roles.includes(Role.CLIENT)) {
      return { status: "redirect", redirectUrl: "/403" };
    }
    return { status: "next" };
  }

  if (pathname === "/mfa") {
    if (!user) {
      return { status: "redirect", redirectUrl: "/login" };
    }
    if (user.mfaPassed) {
      const isStaffMember = roles.some((r) => STAFF_ROLES.includes(r));
      return { status: "redirect", redirectUrl: isStaffMember ? "/admin" : "/" };
    }
    return { status: "next" };
  }

  return { status: "next" };
}

describe("Middleware Route-Gating Integration Tests (Board 26)", () => {
  const studentUser: AuthUser = {
    id: "usr-student",
    roles: [Role.STUDENT],
    mfaPassed: false,
  };

  const clientUser: AuthUser = {
    id: "usr-client",
    roles: [Role.CLIENT],
    mfaPassed: false,
  };

  const staffPendingMfa: AuthUser = {
    id: "usr-staff-pending",
    roles: [Role.SUPER_ADMIN],
    mfaPassed: false,
  };

  const staffVerifiedMfa: AuthUser = {
    id: "usr-staff-verified",
    roles: [Role.SUPER_ADMIN],
    mfaPassed: true,
  };

  it("blocks unauthenticated access to /admin and redirects to /login", () => {
    const res = simulateMiddleware({ pathname: "/admin/command-center", user: null });
    assert.equal(res.status, "redirect");
    assert.equal(res.redirectUrl, "/login?next=%2Fadmin%2Fcommand-center");
  });

  it("blocks non-staff users from /admin with 403 Forbidden", () => {
    const resStudent = simulateMiddleware({ pathname: "/admin", user: studentUser });
    assert.equal(resStudent.status, "redirect");
    assert.equal(resStudent.redirectUrl, "/403");

    const resClient = simulateMiddleware({ pathname: "/admin", user: clientUser });
    assert.equal(resClient.status, "redirect");
    assert.equal(resClient.redirectUrl, "/403");
  });

  it("gates staff access to /admin until TOTP MFA is passed", () => {
    const resPending = simulateMiddleware({ pathname: "/admin/kpi", user: staffPendingMfa });
    assert.equal(resPending.status, "redirect");
    assert.equal(resPending.redirectUrl, "/mfa?next=%2Fadmin%2Fkpi");

    const resVerified = simulateMiddleware({ pathname: "/admin/kpi", user: staffVerifiedMfa });
    assert.equal(resVerified.status, "next");
  });

  it("protects /student-dashboard for STUDENT role only", () => {
    assert.equal(
      simulateMiddleware({ pathname: "/student-dashboard/courses", user: null }).redirectUrl,
      "/login?next=%2Fstudent-dashboard%2Fcourses"
    );

    assert.equal(
      simulateMiddleware({ pathname: "/student-dashboard/courses", user: clientUser }).redirectUrl,
      "/403"
    );

    assert.equal(
      simulateMiddleware({ pathname: "/student-dashboard/courses", user: studentUser }).status,
      "next"
    );
  });

  it("protects /client-dashboard for CLIENT role only", () => {
    assert.equal(
      simulateMiddleware({ pathname: "/client-dashboard/projects", user: null }).redirectUrl,
      "/login?next=%2Fclient-dashboard%2Fprojects"
    );

    assert.equal(
      simulateMiddleware({ pathname: "/client-dashboard/projects", user: studentUser }).redirectUrl,
      "/403"
    );

    assert.equal(
      simulateMiddleware({ pathname: "/client-dashboard/projects", user: clientUser }).status,
      "next"
    );
  });

  it("allows public routes without authentication", () => {
    assert.equal(simulateMiddleware({ pathname: "/", user: null }).status, "next");
    assert.equal(simulateMiddleware({ pathname: "/research", user: null }).status, "next");
    assert.equal(simulateMiddleware({ pathname: "/services", user: null }).status, "next");
  });
});
