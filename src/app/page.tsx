import { Dashboard } from "@/components/dashboard";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SpotifySignIn } from "@/components/spotify-sign-in";
import { auth } from "@/lib/auth";
import { createUser, getUserByEmail, updateUser } from "@/lib/db/users";
import { headers } from "next/headers";

export default async function Home() {
  const headersList = await headers();
  const session = await auth();
  const domain = headersList.get("host") || "";

  if (session?.user?.email) {
    let user = await getUserByEmail(session.user.email);
    if (user) {
      await updateUser(session.user.email, {
        at: session.spotify_access_token,
        rt: session.spotify_refresh_token,
        exp: session.spotify_expires_at,
      });
    } else {
      const {
        spotify_access_token,
        spotify_expires_at,
        spotify_refresh_token,
      } = session;
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
          <section>
            <h2 className="text-4xl font-mix-ui-title font-bold mb-12 text-center">
              {"Showcase what you're listening to live!"}
            </h2>
            <SpotifySignIn />
          </section>
        )}
      </div>
      <Footer />
    </main>
  );
}
