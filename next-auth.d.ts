import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    spotify_refresh_token?: string;
    spotify_access_token?: string;
    spotify_expires_at?: number;
  }
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    spotify_refresh_token?: string;
    spotify_access_token?: string;
    spotify_expires_at?: number;
  }
}
