import { Dashboard } from '@/components/dashboard';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { SpotifySignIn } from '@/components/spotify-sign-in';
import { auth } from '@/lib/auth';
import { createUser, getUserByEmail, updateUser } from '@/lib/db/users';
import { headers } from 'next/headers';
import NextImage from 'next/image';

export default async function Home() {
    const headersList = await headers();
    const session = await auth();
    const domain = headersList.get('host') || '';

    if (session?.user?.email) {
        const user = await getUserByEmail(session.user.email);
        if (user) {
            await updateUser(session.user.email, {
                at: session.spotify_access_token,
                rt: session.spotify_refresh_token,
                exp: session.spotify_expires_at,
            });
        } else {
            const { spotify_access_token, spotify_expires_at, spotify_refresh_token } = session;
            if (spotify_access_token && spotify_expires_at && spotify_refresh_token) {
                await createUser({
                    email: session.user.email,
                    at: spotify_access_token,
                    rt: spotify_refresh_token,
                    exp: spotify_expires_at,
                });
            }
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center">
            <Header />
            <div className="w-full max-w-md min-h-full">
                {session ? (
                    <Dashboard domain={domain} session={session} />
                ) : (
                    <>
                        <section>
                            <h2 className="text-4xl font-mix-ui-title font-bold mb-12 text-center">
                                {"Showcase what you're listening to live!"}
                            </h2>
                            <NextImage
                                className="mb-12 aspect-auto border border-zinc-800 rounded-lg"
                                src="/widget.png"
                                alt="sample of the spotify npo widget"
                                width={581}
                                height={154}
                            />

                            <section className="flex flex-col items-center gap-4 mb-12">
                                <SpotifySignIn />
                                <p className="text-zinc-400">to get started 🤘🏻</p>
                            </section>

                            <h3 className="text-3xl max-w-72 mx-auto font-mix-ui-title font-bold text-center mb-10">
                                Fully customizable to match your style
                            </h3>

                            <NextImage
                                className="mb-12 aspect-auto mx-auto border border-zinc-800 rounded-lg"
                                src="/customize.png"
                                alt="example of the customization options"
                                width={527}
                                height={259}
                            />
                        </section>
                    </>
                )}
            </div>
            <Footer />
        </main>
    );
}
