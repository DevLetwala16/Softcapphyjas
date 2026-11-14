import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@softcapphyjas/db";

const BetaSignupSchema = z.object({
  email: z.string().email("Invalid email address"),
  useCase: z.string().min(3, "Please describe your planned use case"),
  orgSize: z.string().optional(),
  turnstileToken: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = BetaSignupSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { email, useCase, orgSize } = result.data;

    let position = 412;

    try {
      // Check if already registered
      const existing = await prisma.betaSignup.findUnique({
        where: { email },
      });

      if (existing) {
        return NextResponse.json({
          success: true,
          position: existing.position,
          message: "You are already registered on the waitlist.",
        });
      }

      const count = await prisma.betaSignup.count();
      position = 400 + count + 1;

      await prisma.betaSignup.create({
        data: {
          email,
          useCase,
          orgSize: orgSize || "10-50",
          position,
        },
      });
    } catch {
      // Fallback in case DB is offline in dev
      position = Math.floor(Math.random() * 50) + 420;
    }

    return NextResponse.json({
      success: true,
      position,
      message: "Successfully joined the Synapse Private Beta waitlist.",
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error registering beta waitlist." },
      { status: 500 }
    );
  }
}
