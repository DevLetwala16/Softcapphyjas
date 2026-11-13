import { Role } from "@softcapphyjas/db";
import { type DefaultSession } from "next-auth";
import { type JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      roles: Role[];
      mfaEnabled: boolean;
      mfaPassed: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    roles?: Role[];
    mfaEnabled?: boolean;
    mfaPassed?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    roles?: Role[];
    mfaEnabled?: boolean;
    mfaPassed?: boolean;
  }
}
