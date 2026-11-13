import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { dataGate } from "../data-gate";
import { Role, PublishStatus } from "@prisma/client";

describe("Layer 3: Data Gate Scoping (Board 26 & Spec §7.2)", () => {
  describe("scopeCourses", () => {
    it("restricts unauthenticated users to published, non-deleted courses", () => {
      const filter = dataGate.scopeCourses(null);
      assert.strictEqual(filter.status, PublishStatus.PUBLISHED);
      assert.strictEqual(filter.deletedAt, null);
    });

    it("allows SUPER_ADMIN to see all courses including drafts", () => {
      const filter = dataGate.scopeCourses({ id: "admin-1", roles: [Role.SUPER_ADMIN] });
      assert.strictEqual(filter.status, undefined);
      assert.strictEqual(filter.deletedAt, null);
    });

    it("allows INSTRUCTOR to see own courses or published courses", () => {
      const filter = dataGate.scopeCourses({ id: "instr-1", roles: [Role.INSTRUCTOR] });
      assert.strictEqual(filter.deletedAt, null);
      assert.ok(Array.isArray(filter.OR));
    });
  });

  describe("scopeProjects", () => {
    it("scopes projects strictly to client's own id", () => {
      const filter = dataGate.scopeProjects({ id: "client-123", roles: [Role.CLIENT] });
      assert.strictEqual(filter.clientId, "client-123");
      assert.strictEqual(filter.deletedAt, null);
    });

    it("allows ADMIN and SALES_MANAGER to view all active projects", () => {
      const adminFilter = dataGate.scopeProjects({ id: "admin-1", roles: [Role.ADMIN] });
      assert.strictEqual(adminFilter.clientId, undefined);
      assert.strictEqual(adminFilter.deletedAt, null);

      const salesFilter = dataGate.scopeProjects({ id: "sales-1", roles: [Role.SALES_MANAGER] });
      assert.strictEqual(salesFilter.clientId, undefined);
      assert.strictEqual(salesFilter.deletedAt, null);
    });

    it("denies access to unauthorized roles", () => {
      const filter = dataGate.scopeProjects({ id: "student-1", roles: [Role.STUDENT] });
      assert.strictEqual(filter.id, "__NO_ACCESS__");
    });
  });

  describe("scopeInvoices", () => {
    it("restricts client to invoices for their own projects", () => {
      const filter = dataGate.scopeInvoices({ id: "client-123", roles: [Role.CLIENT] });
      assert.deepStrictEqual(filter.project, { clientId: "client-123" });
    });

    it("allows FINANCE to see all invoices", () => {
      const filter = dataGate.scopeInvoices({ id: "fin-1", roles: [Role.FINANCE] });
      assert.strictEqual(filter.project, undefined);
    });
  });

  describe("scopeEnrollments", () => {
    it("scopes enrollments strictly to student's user id", () => {
      const filter = dataGate.scopeEnrollments({ id: "student-99", roles: [Role.STUDENT] });
      assert.strictEqual(filter.userId, "student-99");
    });

    it("scopes enrollments to instructor's courses", () => {
      const filter = dataGate.scopeEnrollments({ id: "instr-1", roles: [Role.INSTRUCTOR] });
      assert.deepStrictEqual(filter.course, { instructorId: "instr-1" });
    });
  });
});
