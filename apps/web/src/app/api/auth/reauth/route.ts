import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma, createAuditLog } from "@softcapphyjas/db";
import { verifyReauthCredentials } from "@softcapphyjas/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const { credential } = body;

  if (!credential || typeof credential !== "string") {
    return NextResponse.json(
      { error: "Password or 6-digit TOTP verification code is required" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      passwordHash: true,
      mfaSecret: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const isValid = await verifyReauthCredentials(credential, {
    passwordHash: user.passwordHash,
    mfaSecret: user.mfaSecret,
  });

  if (!isValid) {
    return NextResponse.json(
      { error: "Re-authentication failed. Please check your password or TOTP code." },
      { status: 401 }
    );
  }

  // Record audit log for security compliance
  await createAuditLog({
    actorId: user.id,
    action: "SECURITY_REAUTH_CONFIRMED",
    entity: "User",
    entityId: user.id,
    ip: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip"),
    ua: req.headers.get("user-agent"),
  });

  return NextResponse.json({
    success: true,
    reauthenticatedAt: new Date().toISOString(),
    expiresInSec: 900, // 15 minute security grant window
  });
}
