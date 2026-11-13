import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@softcapphyjas/db";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 30 * 60 * 1000); // 30 minute TTL

    // Upsert verification token
    await prisma.verificationToken.create({
      data: {
        identifier: normalizedEmail,
        token,
        expires,
      },
    });

    // In production, dispatch via Resend / SMTP. For development/testing, log magic link URL
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const magicLinkUrl = `${appUrl}/api/auth/magic-link/verify?token=${token}&email=${encodeURIComponent(normalizedEmail)}`;
    console.log(`[AUTH MAGIC LINK DISPATCHED] -> ${normalizedEmail}: ${magicLinkUrl}`);

    return NextResponse.json({
      success: true,
      message: "If an account exists, a secure magic link has been sent.",
    });
  } catch (error) {
    console.error("Magic link dispatch error:", error);
    return NextResponse.json({ error: "Failed to dispatch magic link" }, { status: 500 });
  }
}
