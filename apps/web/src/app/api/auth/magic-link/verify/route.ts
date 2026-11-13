import { NextRequest, NextResponse } from "next/server";
import { prisma, Role } from "@softcapphyjas/db";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const email = req.nextUrl.searchParams.get("email");

  if (!token || !email) {
    return NextResponse.redirect(new URL("/login?error=InvalidToken", req.url));
  }

  const normalizedEmail = email.toLowerCase().trim();

  // Find verification token in DB
  const record = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!record || record.identifier !== normalizedEmail || record.expires < new Date()) {
    return NextResponse.redirect(new URL("/login?error=ExpiredOrInvalidToken", req.url));
  }

  // Single-use token: consume immediately
  await prisma.verificationToken.delete({
    where: { token },
  });

  // Find or create user
  let user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        roles: [Role.STUDENT],
        emailVerified: new Date(),
      },
    });
  } else if (!user.emailVerified) {
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    });
  }

  // Redirect to workspace based on user role
  if (user.roles.includes(Role.SUPER_ADMIN) || user.roles.includes(Role.ADMIN)) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }
  if (user.roles.includes(Role.CLIENT)) {
    return NextResponse.redirect(new URL("/client-dashboard", req.url));
  }
  return NextResponse.redirect(new URL("/student-dashboard", req.url));
}
