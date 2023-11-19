import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { createUser, getUserByEmail, updateUser } from '@/lib/db/users';
import { headers } from 'next/headers';
import { Code2 } from 'lucide-react';

export default async function Home() {
    const headersList = headers();
    const session = await getServerSession(authOptions);
    const domain = headersList.get('host') || '';

    if (session?.user?.email) {
        let user = await getUserByEmail(session.user.email);
        if (user) {
            await updateUser(session.user.email, {
                at: session.spotify_access_token,
                rt: session.spotify_refresh_token,
                exp: session.spotify_expires_at,
            });
        } else {
            await createUser({
                email: session.user.email,
                at: session.spotify_access_token,
                rt: session.spotify_refresh_token,
                exp: session.spotify_expires_at,
            });
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24">
            <div>
                {session ? (
                    <div>
                        <div className="md:flex justify-between items-baseline mb-4 p-2">
                            <div className='font-bold mb-8 md:mb-0'>Spotify Now Playing Overlay</div>
                            <div className="text-sm flex justify-end gap-6">
                                <Link className='text-[#1DB954] hover:underline active:underline' href={`/spotify?id=${encodeURIComponent(session.user?.email ?? '')}`}>
                                    Now Playing
                                </Link>
                                <Link className='text-[#1DB954] hover:underline active:underline' href={'/api/auth/signout'}>Sign Out</Link>
                            </div>
                        </div>
                        <pre className="whitespace-pre-wrap break-all max-w-3/4 w-full border p-8 rounded-3xl">
                            {domain}/spotify?id={encodeURIComponent(session.user?.email ?? '')}
                        </pre>

                        <div className="text-xs mt-4 text-center">Copy the above url</div>
                    </div>
                ) : (
                    <Link href={'/api/auth/signin/spotify'}>Sign in with Spotify</Link>
                )}
            </div>
            <div className="flex flex-col items-center text-center text-sm">
                <Code2 className='w-4'/>
                <div>Built by Mike Cabana</div>
                <div>{new Date().getFullYear()}</div>
            </div>
        </main>
    );
}
