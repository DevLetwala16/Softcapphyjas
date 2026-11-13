import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { prisma, Role } from "@softcapphyjas/db";
import { STAFF_ROLES } from "@softcapphyjas/auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
      ? [
          Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            allowDangerousEmailAccountLinking: true,
          }),
        ]
      : []),
    ...(process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET
      ? [
          GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
            allowDangerousEmailAccountLinking: true,
          }),
        ]
      : []),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = String(credentials.email).toLowerCase().trim();
        const password = String(credentials.password);

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.passwordHash || user.deletedAt) {
          return null;
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
          return null;
        }

        // Check if staff user requires MFA
        const userIsStaff = user.roles.some((r) => STAFF_ROLES.includes(r));

        // Update last login timestamp
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? null,
          image: user.image ?? null,
          roles: user.roles,
          mfaEnabled: user.mfaEnabled,
          // Staff with MFA enabled starts with mfaPassed = false until TOTP verification
          mfaPassed: userIsStaff && user.mfaEnabled ? false : true,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        if (user.id) token.id = user.id;
        token.roles = user.roles ?? [Role.STUDENT];
        token.mfaEnabled = user.mfaEnabled ?? false;
        token.mfaPassed = user.mfaPassed ?? false;
      }

      // If user signed in via OAuth and has no roles in token, query DB
      if (token.id && (!token.roles || (token.roles as Role[]).length === 0)) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { roles: true, mfaEnabled: true },
        });
        if (dbUser) {
          token.roles = dbUser.roles;
          token.mfaEnabled = dbUser.mfaEnabled;
          token.mfaPassed = !dbUser.mfaEnabled;
        }
      }

      // Handle session update (e.g. after successful MFA verification)
      if (trigger === "update" && session) {
        if (session.mfaPassed !== undefined) {
          token.mfaPassed = Boolean(session.mfaPassed);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.roles = (token.roles as Role[]) ?? [Role.STUDENT];
        session.user.mfaEnabled = (token.mfaEnabled as boolean) ?? false;
        session.user.mfaPassed = (token.mfaPassed as boolean) ?? false;
      }
      return session;
    },
  },
});
