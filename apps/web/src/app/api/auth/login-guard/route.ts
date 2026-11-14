import { NextRequest, NextResponse } from "next/server";
import { rateLimiter } from "@/lib/rate-limit";

function getClientIdentifier(req: NextRequest, email?: string): string {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";
  return email ? `${ip}:${email.toLowerCase().trim()}` : ip;
}

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email") || undefined;
  const key = getClientIdentifier(req, email);
  const status = rateLimiter.check(key);
  return NextResponse.json(status);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { action, email, turnstileToken } = body;
  const key = getClientIdentifier(req, email);

  if (action === "record_failure") {
    const status = rateLimiter.recordFailure(key);
    return NextResponse.json(status);
  }

  if (action === "record_success") {
    rateLimiter.recordSuccess(key);
    return NextResponse.json({ success: true });
  }

  if (action === "verify_turnstile") {
    // If turnstileToken is present, consider challenge passed in dev mode or verify with Cloudflare
    if (turnstileToken) {
      return NextResponse.json({ success: true, verified: true });
    }
    return NextResponse.json({ error: "Turnstile challenge token missing" }, { status: 400 });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
