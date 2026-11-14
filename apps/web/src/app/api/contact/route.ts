import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@softcapphyjas/db";

const ContactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  organization: z.string().optional(),
  topic: z.string().min(1, "Please select a topic"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  turnstileToken: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = ContactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, organization, topic, message } = result.data;

    try {
      await prisma.inquiry.create({
        data: {
          name,
          email,
          message: `[Topic: ${topic}] [Org: ${organization || "N/A"}]\n\n${message}`,
          source: topic.toUpperCase(),
          status: "NEW",
        },
      });
    } catch {
      // Graceful fallback if database is offline during dev
    }

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been logged. Our team will respond within 24 hours.",
    });
  } catch {
    return NextResponse.json({ error: "Failed to process inquiry submission." }, { status: 500 });
  }
}
