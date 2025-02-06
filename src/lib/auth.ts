import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";

import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  secret: `${process.env.AUTH_SECRET}`,
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    Spotify({
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: { scope: "user-read-email user-read-currently-playing" },
      },
    }),
  ],
  pages: {
    error: "/",
    signIn: "/",
  },
  callbacks: {
    jwt: async ({ token, user, account, profile, session, trigger }) => {
      if (account?.provider === "spotify") {
        token.spotify_refresh_token = account.refresh_token;
        token.spotify_access_token = account.access_token;
        token.spotify_expires_at = account.expires_at;
      }

      return token;
    },
    session: async ({ session, token, newSession, user, trigger }) => {
      if (token?.spotify_access_token) {
        session.spotify_refresh_token = token.spotify_refresh_token;
        session.spotify_access_token = token.spotify_access_token;
        session.spotify_expires_at = token.spotify_expires_at;
      }

      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
