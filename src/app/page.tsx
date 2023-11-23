import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import { createUser, getUserByEmail, updateUser } from '@/lib/db/users';
import { headers } from 'next/headers';
import { ExternalLink, Sparkle } from 'lucide-react';
import { SiGithub, SiThreads } from '@icons-pack/react-simple-icons';
import { SpotifySignIn } from '@/components/spotify-sign-in';
import { SignOut } from '@/components/sign-out';
import { CopyToClipboardBtn } from '@/components/copy-to-clipboard-btn';
import { Btn } from '@/components/btn';

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
        <main className="flex min-h-screen flex-col items-center justify-between px-8 py-24 md:p-24">
            <div>
                {session ? (
                    <>
                        <div className='mb-8'>
                            <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-baseline p-2">
                                <div className="font-bold md:mb-0">Spotify Now Playing Overlay</div>
                                <div className="text-xs flex justify-end">
                                    <SignOut>Sign Out</SignOut>
                                </div>
                            </div>
                            <pre className="text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap break-all max-w-3/4 border border-zinc-300 dark:border-zinc-800 p-8 mx-4 rounded-lg my-4 bg-fern-200 bg-opacity-10">
                                {domain}/spotify?id={encodeURIComponent(session.user?.email ?? '')}
                            </pre>

                            <div className="text-xs text-center flex justify-between">
                                <CopyToClipboardBtn
                                    value={`${domain}/spotify?id=${encodeURIComponent(session.user?.email ?? '')}`}
                                >
                                    Copy URL
                                </CopyToClipboardBtn>
                                <Btn
                                    href={`/spotify?id=${encodeURIComponent(session.user?.email ?? '')}`}
                                    className="flex items-center"
                                >
                                    Go to Now Playing
                                    <ExternalLink className="w-4 h-4 ml-2" />
                                </Btn>
                            </div>
                        </div>
                        <div className="h-[166px]">
                            <iframe
                                className="w-full h-full"
                                src={`http://${domain}/spotify?id=${encodeURIComponent(session.user?.email ?? '')}`}
                            ></iframe>
                            <div className="text-xs opacity-60 flex items-start justify-center">
                                This is embedded <Sparkle className="w-4 h-4 ml-1" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col gap-8 items-center p-2">
                        <div className="font-bold mb-8 md:mb-0">Spotify Now Playing Overlay</div>
                        <SpotifySignIn>Sign in with Spotify</SpotifySignIn>
                    </div>
                )}
            </div>
            <div className="flex flex-col items-center text-center text-sm">
                <div className="flex items-center justify-center gap-1 mb-4">
                    <Btn href="https://github.com/mikecabana/spotify-now-playing-overlay" target="_blank">
                        <SiGithub className="w-4 h-4" />
                    </Btn>
                    <Btn href="https://threads.net/@mikecabana" target="_blank">
                        <SiThreads className="w-4 h-4" />
                    </Btn>
                </div>
                <div>Built by Mike Cabana</div>
                <div>{new Date().getFullYear()}</div>
            </div>
        </main>
    );
}
