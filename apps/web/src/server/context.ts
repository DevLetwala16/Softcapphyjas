import { auth } from "@/auth";
import { prisma } from "@softcapphyjas/db";
import { type FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export async function createTRPCContext(opts?: FetchCreateContextFnOptions) {
  const session = await auth();

  return {
    prisma,
    session,
    headers: opts?.req.headers,
  };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
