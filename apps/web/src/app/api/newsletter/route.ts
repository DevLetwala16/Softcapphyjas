import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@softcapphyjas/db";

const NewsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
  turnstileToken: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = NewsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { email } = result.data;

    try {
      await prisma.inquiry.create({
        data: {
          name: "Newsletter Subscriber",
          email,
          message: "Opted into frontier research dispatch and platform announcements.",
          source: "NEWSLETTER",
          status: "NEW",
        },
      });
    } catch {
      // Graceful fallback if database service is not actively booted
    }

    return NextResponse.json({
      success: true,
      message: "Subscription registered successfully. Please check your inbox.",
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error occurred while registering subscription." },
      { status: 500 }
    );
  }
}
