import { auth } from "@/auth";
import { NextResponse } from "next/server";

const STAFF_ROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "HR_MANAGER",
  "HR_EXECUTIVE",
  "RESEARCHER",
  "INSTRUCTOR",
  "CONTENT_EDITOR",
  "ENGINEER",
  "SALES_MANAGER",
  "FINANCE",
  "EMPLOYEE",
];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const user = req.auth?.user;
  const roles: string[] = (user?.roles as unknown as string[]) ?? [];

  // Helper redirect
  const requireAuthOrForbidden = (isAuthorized: boolean) => {
    if (!user) {
      return NextResponse.redirect(new URL(`/login?next=${encodeURIComponent(pathname)}`, req.url));
    }
    if (!isAuthorized) {
      return NextResponse.redirect(new URL("/403", req.url));
    }
    return NextResponse.next();
  };

  // 1. Admin & Staff portal routes (/admin/*)
  if (pathname.startsWith("/admin")) {
    if (!user) {
      return NextResponse.redirect(new URL(`/login?next=${encodeURIComponent(pathname)}`, req.url));
    }

    const isStaffMember = roles.some((r) => STAFF_ROLES.includes(r));
    if (!isStaffMember) {
      return NextResponse.redirect(new URL("/403", req.url));
    }

    // If staff user has MFA enabled and hasn't passed verification yet, redirect to /mfa
    if (user.mfaEnabled && !user.mfaPassed) {
      // Allow setup-mfa if navigating to setup
      if (pathname === "/admin/setup-mfa") {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL(`/mfa?next=${encodeURIComponent(pathname)}`, req.url));
    }

    return NextResponse.next();
  }

  // 2. Student LMS portal routes (/student-dashboard/*)
  if (pathname.startsWith("/student-dashboard")) {
    return requireAuthOrForbidden(roles.includes("STUDENT"));
  }

  // 3. Client Enterprise portal routes (/client-dashboard/*)
  if (pathname.startsWith("/client-dashboard")) {
    return requireAuthOrForbidden(roles.includes("CLIENT"));
  }

  // 4. MFA gate route itself
  if (pathname === "/mfa") {
    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    // If user already passed MFA or doesn't need it, redirect to admin or appropriate portal
    if (user.mfaPassed) {
      const isStaffMember = roles.some((r) => STAFF_ROLES.includes(r));
      return NextResponse.redirect(new URL(isStaffMember ? "/admin" : "/", req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/student-dashboard/:path*",
    "/client-dashboard/:path*",
    "/mfa",
  ],
};
