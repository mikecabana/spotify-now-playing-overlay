import { SpotifyNowPlaying } from "@/components/spotify-now-playing";
import { prisma } from "@/lib/db/db";
import { refreshAccessTokenServer } from "@/lib/spotify";
import { decodeEmail } from "@/lib/utils";
import { Users } from "@prisma/client/edge";
import { headers } from "next/headers";

type SpotifyProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    size: "sm" | "md" | "lg";
    color: string;
    border: string;
    text: string;
    rounded: "true" | "false";
  }>;
};

export default async function Spotify({ params, searchParams }: SpotifyProps) {
  const _headers = await headers();

  let { id } = await params;
  id = decodeEmail(id);

  const { size, color, border, text, rounded } = await searchParams;

  const scheme = _headers.get("scheme") || "";

  let user: Users | null;

  try {
    user = await prisma.users.findFirst({ where: { email: id } });
    if (!user || !user.rt) {
      return <>Please sign in at least once</>;
    }

    if (!user.exp || user.exp > Date.now()) {
      const response = await refreshAccessTokenServer({
        refreshToken: user.rt,
      });

      if ("error" in response) {
        return <>Re-authenticate in the dashboard</>;
      }

      const { access_token, refresh_token, expires_in } = response;

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
    console.log("ERROR", error);
    return <>Please sign in at least once</>;
  }

  return (
    <main className="bg-transparent">
      <SpotifyNowPlaying
        at={`${user.at}`}
        email={user.email}
        host={scheme}
        size={size}
        color={color}
        border={border}
        text={text}
        rounded={rounded}
      />
    </main>
  );
}
