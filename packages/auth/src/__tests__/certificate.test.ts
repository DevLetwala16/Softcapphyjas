import { describe, it } from "node:test";
import assert from "node:assert";
import {
  signCertificatePayload,
  verifyCertificateSignature,
  generateCertificateId,
} from "../certificate";

describe("Ed25519 Certificate Signing & Verification (Phase 4 LMS)", () => {
  it("generates a well-formatted certificate ID", () => {
    const certId = generateCertificateId();
    assert.match(certId, /^SCP-CERT-\d{4}-[A-Z0-9]{6}$/);
  });

  it("produces deterministic cryptographic signature for certificate payload", () => {
    const payload = {
      publicId: "SCP-CERT-2026-TEST01",
      enrollmentId: "enr_test_123",
      studentName: "Alex Mercer",
      courseTitle: "Autonomous Multi-Agent Systems & Tool-Use Architecture",
      completedAt: new Date("2026-10-15"),
    };

    const signature1 = signCertificatePayload(payload);
    const signature2 = signCertificatePayload(payload);

    assert.strictEqual(typeof signature1, "string");
    assert.strictEqual(signature1.length > 20, true);
    assert.strictEqual(signature1, signature2);
  });

  it("verifies valid certificate signatures successfully", () => {
    const payload = {
      publicId: "SCP-CERT-2026-TEST01",
      enrollmentId: "enr_test_123",
      studentName: "Alex Mercer",
      courseTitle: "Autonomous Multi-Agent Systems & Tool-Use Architecture",
      completedAt: new Date("2026-10-15"),
    };

    const signature = signCertificatePayload(payload);
    const isValid = verifyCertificateSignature(payload, signature);

    assert.strictEqual(isValid, true);
  });

  it("rejects tampered certificate payload data", () => {
    const payload = {
      publicId: "SCP-CERT-2026-TEST01",
      enrollmentId: "enr_test_123",
      studentName: "Alex Mercer",
      courseTitle: "Autonomous Multi-Agent Systems & Tool-Use Architecture",
      completedAt: new Date("2026-10-15"),
    };

    const signature = signCertificatePayload(payload);

    // Tampered student name
    const tamperedPayload = {
      ...payload,
      studentName: "Imposter Hacker",
    };

    const isValid = verifyCertificateSignature(tamperedPayload, signature);
    assert.strictEqual(isValid, false);
  });
});
