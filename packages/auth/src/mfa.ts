import { generateSecret, generateURI, verifySync } from "otplib";
import QRCode from "qrcode";

export function generateMfaSecret(): string {
  return generateSecret();
}

export async function generateMfaQrCode(
  email: string,
  secret: string,
  issuer = "Softcapphyjas"
): Promise<{ uri: string; qrDataUrl: string }> {
  const uri = generateURI({
    label: email,
    issuer,
    secret,
  });

  const qrDataUrl = await QRCode.toDataURL(uri, {
    width: 256,
    margin: 2,
    color: {
      dark: "#05070D",
      light: "#FFFFFF",
    },
  });

  return { uri, qrDataUrl };
}

export function verifyMfaToken(token: string, secret: string): boolean {
  if (!token || !secret) return false;
  const cleanToken = token.replace(/\s+/g, "");
  try {
    const result = verifySync({ token: cleanToken, secret });
    return result.valid === true;
  } catch {
    return false;
  }
}

export function generateBackupCodes(count = 8): string[] {
  const codes: string[] = [];
  const chars = "0123456789abcdef";
  for (let i = 0; i < count; i++) {
    let p1 = "";
    let p2 = "";
    for (let j = 0; j < 4; j++) {
      p1 += chars[Math.floor(Math.random() * chars.length)];
      p2 += chars[Math.floor(Math.random() * chars.length)];
    }
    codes.push(`${p1}-${p2}`);
  }
  return codes;
}
