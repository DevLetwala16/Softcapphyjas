"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { TRPCProvider } from "./trpc-provider";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <TRPCProvider>{children}</TRPCProvider>
    </SessionProvider>
  );
}
