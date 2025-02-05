import NextAuth from 'next-auth';
import Spotify from 'next-auth/providers/spotify';

import type { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
	secret: `${process.env.NEXTAUTH_SECRET}`,
	theme: {
		logo: 'https://next-auth.js.org/img/logo/logo-sm.png',
	},
	providers: [
		Spotify({
			clientId: `${process.env.SPOTIFY_CLIENT_ID}`,
			clientSecret: `${process.env.SPOTIFY_CLIENT_SECRET}`,
			authorization: {
				url: 'https://accounts.spotify.com/authorize',
				params: { scope: 'user-read-email user-read-currently-playing' },
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user, account, profile, session, trigger }) => {
			if (account?.provider === 'spotify') {
				token.spotify_refresh_token = account.refresh_token;
				token.spotify_access_token = account.access_token;
				token.spotify_expires_at = account.expires_at;
			}

			return token;
		},
		session: async ({ session, token, newSession, user, trigger }) => {
			if (token?.spotify_access_token) {
				session.spotify_refresh_token = token.spotify_refresh_token as string;
                session.spotify_access_token = token.spotify_access_token as string;
				session.spotify_expires_at = token.spotify_expires_at  as number;
			}

			return session;
		},
	},
};

export default NextAuth(authOptions);
