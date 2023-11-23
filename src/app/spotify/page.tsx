import { SpotifyNowPlaying } from '@/components/spotify-now-playing';
import { prisma } from '@/lib/db/db';
import { refreshAccessTokenServer } from '@/lib/spotify';
import { Users } from '@prisma/client';
import { headers } from 'next/headers';

export default async function Spotify(ctx: any) {
    const _headers = headers();
    const { id } = ctx.searchParams;
    const scheme = _headers.get('scheme') || '';

    let user: Users | null;

    try {
        user = await prisma.users.findFirst({ where: { email: id } });
        if (!user || !user.rt) {
            return <>Please sign in at least once</>;
        }

        if (!user.exp || user.exp > Date.now()) {
            const { access_token, refresh_token, token_type, expires_in, scope } = await refreshAccessTokenServer({
                refreshToken: user.rt,
            });
            await prisma.users.update({
                data: {
                    at: access_token,
                    rt: refresh_token ?? user.rt,
                    exp: Math.floor(Date.now() / 1000) + expires_in,
                },
                where: {
                    email: id,
                },
            });
        }
    } catch (error) {
        console.log('ERROR', error);
        return <>Please sign in at least once</>;
    }

    return (
        <main className="p-4">
            <SpotifyNowPlaying at={`${user.at}`} email={user.email} host={scheme} />
        </main>
    );
}
