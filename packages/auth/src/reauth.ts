import bcrypt from "bcryptjs";
import { verifyMfaToken } from "./mfa";

export interface ReauthTargetUser {
  passwordHash?: string | null;
  mfaSecret?: string | null;
}

/**
 * Re-authentication Verification (Master Spec §7.3)
 * Enforces fresh verification of credentials (Password or TOTP)
 * prior to critical actions (Role modifications, refunds, financial changes).
 */
export async function verifyReauthCredentials(
  credential: string,
  user: ReauthTargetUser
): Promise<boolean> {
  if (!credential) return false;

  const clean = credential.trim();

  // 1. Check if credential is a 6-digit TOTP code
  if (/^\d{6}$/.test(clean) && user.mfaSecret) {
    const totpValid = verifyMfaToken(clean, user.mfaSecret);
    if (totpValid) return true;
  }

  // 2. Check if credential is the account password
  if (user.passwordHash) {
    const passwordValid = await bcrypt.compare(clean, user.passwordHash);
    if (passwordValid) return true;
  }

  return false;
}
