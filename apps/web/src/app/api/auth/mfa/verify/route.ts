import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@softcapphyjas/db";
import { verifyMfaToken } from "@softcapphyjas/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const { token, isEnrolling } = body;

  if (!token || typeof token !== "string") {
    return NextResponse.json({ error: "TOTP verification code is required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user || !user.mfaSecret) {
    return NextResponse.json({ error: "MFA is not initiated for this account" }, { status: 400 });
  }

  const isValid = verifyMfaToken(token, user.mfaSecret);
  if (!isValid) {
    return NextResponse.json(
      { error: "Invalid two-factor code. Please check your authenticator app and try again." },
      { status: 400 }
    );
  }

  // If this was an initial enrollment, enable MFA permanently
  if (isEnrolling || !user.mfaEnabled) {
    await prisma.user.update({
      where: { id: user.id },
      data: { mfaEnabled: true },
    });
  }

  return NextResponse.json({
    success: true,
    mfaPassed: true,
    redirectUrl: "/admin",
  });
}
