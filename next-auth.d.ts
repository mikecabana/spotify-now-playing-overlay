import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Session extends DefaultSession {
        spotify_refresh_token: string;
        spotify_access_token: string;
        spotify_expires_at: number;
    }
}
