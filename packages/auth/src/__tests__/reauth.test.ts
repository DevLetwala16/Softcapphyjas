import { describe, it } from "node:test";
import assert from "node:assert/strict";
import bcrypt from "bcryptjs";
import { generateMfaSecret, verifyReauthCredentials } from "../index";
import { generateSync } from "otplib";

describe("Re-authentication Engine (Spec §7.3 & Board 26)", () => {
  it("verifies re-authentication using user password", async () => {
    const rawPassword = "SecurePassword123!";
    const passwordHash = await bcrypt.hash(rawPassword, 10);

    const user = { passwordHash };

    const valid = await verifyReauthCredentials(rawPassword, user);
    assert.strictEqual(valid, true, "Valid password should pass re-auth");

    const invalid = await verifyReauthCredentials("WrongPassword!", user);
    assert.strictEqual(invalid, false, "Invalid password should fail re-auth");
  });

  it("verifies re-authentication using 6-digit TOTP token", async () => {
    const secret = generateMfaSecret();
    const validOtp = generateSync({ secret });

    const user = { mfaSecret: secret };

    const valid = await verifyReauthCredentials(validOtp, user);
    assert.strictEqual(valid, true, "Valid TOTP code should pass re-auth");

    const invalid = await verifyReauthCredentials("000000", user);
    assert.strictEqual(invalid, false, "Invalid TOTP code should fail re-auth");
  });

  it("fails gracefully if credential is missing or empty", async () => {
    const user = { passwordHash: "somehash" };
    const valid = await verifyReauthCredentials("", user);
    assert.strictEqual(valid, false, "Empty credential should fail");
  });
});
