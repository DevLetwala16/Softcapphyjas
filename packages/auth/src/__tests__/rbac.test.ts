import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Role } from "@softcapphyjas/db";
import { can, isStaff, getPostLoginRedirect, type AuthUser } from "../rbac";
import { verifyMfaToken, generateMfaSecret, generateBackupCodes } from "../mfa";
import { generateSync } from "otplib";

describe("RBAC Engine Permission Matrix (Spec §7.2 & Board 26)", () => {
  const superAdminUser: AuthUser = {
    id: "user-super",
    email: "super@softcapphyjas.com",
    roles: [Role.SUPER_ADMIN],
    mfaPassed: true,
  };

  const adminUser: AuthUser = {
    id: "user-admin",
    email: "admin@softcapphyjas.com",
    roles: [Role.ADMIN],
    mfaPassed: true,
  };

  const instructorUser: AuthUser = {
    id: "user-instructor",
    email: "instructor@softcapphyjas.com",
    roles: [Role.INSTRUCTOR],
    mfaPassed: true,
  };

  const researcherUser: AuthUser = {
    id: "user-researcher",
    email: "researcher@softcapphyjas.com",
    roles: [Role.RESEARCHER],
    mfaPassed: true,
  };

  const editorUser: AuthUser = {
    id: "user-editor",
    email: "editor@softcapphyjas.com",
    roles: [Role.CONTENT_EDITOR],
    mfaPassed: true,
  };

  const financeUser: AuthUser = {
    id: "user-finance",
    email: "finance@softcapphyjas.com",
    roles: [Role.FINANCE],
    mfaPassed: true,
  };

  const salesUser: AuthUser = {
    id: "user-sales",
    email: "sales@softcapphyjas.com",
    roles: [Role.SALES_MANAGER],
    mfaPassed: true,
  };

  const hrUser: AuthUser = {
    id: "user-hr",
    email: "hr@softcapphyjas.com",
    roles: [Role.HR_MANAGER],
    mfaPassed: true,
  };

  const employeeUser: AuthUser = {
    id: "user-employee",
    email: "emp@softcapphyjas.com",
    roles: [Role.EMPLOYEE],
    mfaPassed: true,
  };

  const clientUser: AuthUser = {
    id: "user-client",
    email: "client@client.com",
    roles: [Role.CLIENT],
    mfaPassed: false,
  };

  const studentUser: AuthUser = {
    id: "user-student",
    email: "student@student.org",
    roles: [Role.STUDENT],
    mfaPassed: false,
  };

  it("SUPER_ADMIN has universal access", () => {
    assert.equal(can(superAdminUser, "read", "users"), true);
    assert.equal(can(superAdminUser, "write", "users"), true);
    assert.equal(can(superAdminUser, "approve", "cms"), true);
    assert.equal(can(superAdminUser, "write", "payments"), true);
  });

  it("ADMIN can RW users and RWA CMS/LMS/Analytics", () => {
    assert.equal(can(adminUser, "read", "users"), true);
    assert.equal(can(adminUser, "write", "users"), true);
    assert.equal(can(adminUser, "approve", "users"), false); // Only SUPER can approve/delete root users
    assert.equal(can(adminUser, "approve", "cms"), true);
    assert.equal(can(adminUser, "approve", "lms"), true);
    assert.equal(can(adminUser, "read", "payments"), true);
    assert.equal(can(adminUser, "write", "payments"), false); // Only finance/super can write payments
  });

  it("CONTENT_EDITOR can RWA CMS and RW LMS, but cannot touch users or payments", () => {
    assert.equal(can(editorUser, "read", "cms"), true);
    assert.equal(can(editorUser, "write", "cms"), true);
    assert.equal(can(editorUser, "approve", "cms"), true);
    assert.equal(can(editorUser, "write", "lms"), true);
    assert.equal(can(editorUser, "read", "users"), false);
    assert.equal(can(editorUser, "read", "payments"), false);
  });

  it("INSTRUCTOR has attribute-scoped write to LMS (own courses only)", () => {
    assert.equal(
      can(instructorUser, "write", "lms", { instructorId: instructorUser.id }),
      true
    );
    assert.equal(
      can(instructorUser, "write", "lms", { instructorId: "different-instructor" }),
      false
    );
    assert.equal(can(instructorUser, "approve", "lms"), false);
  });

  it("RESEARCHER can RW own CMS papers only", () => {
    assert.equal(
      can(researcherUser, "write", "cms", { authorId: researcherUser.id }),
      true
    );
    assert.equal(
      can(researcherUser, "write", "cms", { authorId: "other-researcher" }),
      false
    );
    assert.equal(can(researcherUser, "approve", "cms"), false);
  });

  it("FINANCE can RWA payments and RW student CRM / installments", () => {
    assert.equal(can(financeUser, "read", "payments"), true);
    assert.equal(can(financeUser, "write", "payments"), true);
    assert.equal(can(financeUser, "approve", "payments"), true);
    assert.equal(can(financeUser, "write", "student_crm"), true);
    assert.equal(can(financeUser, "write", "cms"), false);
  });

  it("SALES_MANAGER has RWA on client_crm and R on payments/funnel analytics", () => {
    assert.equal(can(salesUser, "read", "client_crm"), true);
    assert.equal(can(salesUser, "write", "client_crm"), true);
    assert.equal(can(salesUser, "approve", "client_crm"), true);
    assert.equal(can(salesUser, "read", "payments"), true);
    assert.equal(can(salesUser, "write", "payments"), false);
  });

  it("HR_MANAGER has RWA on hr_core / ATS and R on employee users", () => {
    assert.equal(can(hrUser, "read", "hr_core"), true);
    assert.equal(can(hrUser, "write", "hr_core"), true);
    assert.equal(can(hrUser, "approve", "hr_core"), true);
    assert.equal(can(hrUser, "read", "users"), true);
    assert.equal(can(hrUser, "write", "users"), false);
  });

  it("STUDENT has access only to enrolled courses in learning player", () => {
    assert.equal(
      can(studentUser, "read", "learning_player", {
        courseId: "course-1",
        enrolledCourseIds: ["course-1", "course-2"],
      }),
      true
    );
    assert.equal(
      can(studentUser, "read", "learning_player", {
        courseId: "course-unowned",
        enrolledCourseIds: ["course-1", "course-2"],
      }),
      false
    );
    assert.equal(can(studentUser, "read", "cms"), false);
    assert.equal(can(studentUser, "read", "users"), false);
  });

  it("isStaff helper correctly classifies roles", () => {
    assert.equal(isStaff(superAdminUser), true);
    assert.equal(isStaff(instructorUser), true);
    assert.equal(isStaff(researcherUser), true);
    assert.equal(isStaff(employeeUser), true);
    assert.equal(isStaff(clientUser), false);
    assert.equal(isStaff(studentUser), false);
  });

  it("getPostLoginRedirect correctly routes based on roles and MFA status", () => {
    assert.equal(getPostLoginRedirect(studentUser), "/student-dashboard");
    assert.equal(getPostLoginRedirect(clientUser), "/client-dashboard");

    // Staff without mfaPassed redirects to /mfa
    const staffNoMfa: AuthUser = { ...adminUser, mfaPassed: false };
    assert.equal(getPostLoginRedirect(staffNoMfa), "/mfa");

    // Staff with mfaPassed redirects to /admin
    assert.equal(getPostLoginRedirect(adminUser), "/admin");
  });
});

describe("MFA TOTP Engine", () => {
  it("generates secret, valid token, and verifies correctly", () => {
    const secret = generateMfaSecret();
    assert.ok(secret && secret.length >= 16);

    const validToken = generateSync({ secret });
    assert.equal(verifyMfaToken(validToken, secret), true);
    assert.equal(verifyMfaToken("000000", secret), false);
    assert.equal(verifyMfaToken("", secret), false);
  });

  it("generates valid backup codes", () => {
    const codes = generateBackupCodes(8);
    assert.equal(codes.length, 8);
    codes.forEach((code) => {
      assert.match(code, /^[0-9a-f]{4}-[0-9a-f]{4}$/);
    });
  });
});
