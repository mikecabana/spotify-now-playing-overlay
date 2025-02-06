"use client";

import { getSpotifyNowPlaying } from "@/lib/spotify";
import { cn } from "@/lib/utils";
import { Music4 } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type SpotifyNowPlayingProps = {
  email: string;
  at: string;
  host: string;
  size?: string;
  color?: string;
  border?: string;
  text?: string;
  rounded?: string;
};

export function SpotifyNowPlaying({
  email,

  at: _at,
  host,
  size,
  color = "transparent",
  border = "transparent",
  text = "white",
  rounded = "false",
}: SpotifyNowPlayingProps) {
  const timerIdRef = useRef<null | NodeJS.Timeout>(null);
  const [isPollingEnabled, setIsPollingEnabled] = useState(true);

  const [at, setAt] = useState(_at);

  const [name, setName] = useState<string | null>("");
  const [artist, setArtist] = useState<string | null>("");
  const [image, setImage] = useState<any | null>(null);
  const [trackLink, setTrackLink] = useState<string | null>(null);

  useEffect(() => {
    const pollingCallback = async () => {
      try {
        const { image, name, artist, link } = await getSpotifyNowPlaying({
          accessToken: at,
        });
        setName(name);
        setArtist(artist);
        setImage(image);
        setTrackLink(link);
      } catch (error) {
        console.log(error);

        if ((error as Error).message === "Spotify:unauthenticated") {
          // POST to refresh token
          const res = await fetch(`${host}/api/spotify`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email }),
          });
          const { at } = await res.json();
          setAt(at);
          setIsPollingEnabled(true);
        } else {
          setIsPollingEnabled(false);
        }
      }
    };

    const startPolling = () => {
      pollingCallback(); // To immediately start fetching data
      // Polling every x milliseconds
      timerIdRef.current = setInterval(pollingCallback, 12000);
    };

    const stopPolling = () => {
      if (timerIdRef.current) clearInterval(timerIdRef.current);
    };

    if (isPollingEnabled) {
      startPolling();
    } else {
      stopPolling();
    }

    return () => {
      stopPolling();
    };
  }, [at, email, host, isPollingEnabled]);

  const albumSize = size === "sm" ? 65 : size === "lg" ? 120 : 100;

  return (
    <>
      {isPollingEnabled ? (
        <a
          href={trackLink ?? ""}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <div
            style={{
              backgroundColor: color,
              borderWidth: 1,
              borderColor: border,
            }}
            className={cn(
              "flex items-center gap-5 p-4 relative overflow-hidden",
              {
                "gap-6 p-2": size === "sm",
                "gap-6 p-4": size === "lg",
                "rounded-lg": rounded === "true",
              }
            )}
          >
            <div
              style={{ color: text }}
              className="absolute bottom-0 right-0 text-[9px] pr-2 pb-1 opacity-30 font-light"
            >
              powered by Spotify
            </div>
            <div className={`overflow-hidden rounded shrink-0`}>
              {image ? (
                <Image
                  width={albumSize}
                  height={albumSize}
                  src={image.url}
                  alt={`${artist}, ${name} album art`}
                />
              ) : (
                <div
                  className={cn(
                    `w-[100px] h-[100px] flex items-center justify-center bg-zinc-500`,
                    {
                      "w-[65px] h-[65px]": size === "sm",
                      "w-[120px] h-[120px]": size === "lg",
                    }
                  )}
                >
                  <Music4 className={`text-zinc-700 w-8 h-8`} />
                </div>
              )}
            </div>
            <div className="overflow-hidden shrink grow">
              <div
                style={{ color: text, textDecorationColor: text }}
                className={cn(`text-xl truncate group-hover:underline`, {
                  "text-base": size === "sm",
                  "text-2xl": size === "lg",
                })}
              >
                {name ?? "Nothing playing"}
              </div>
              {artist && (
                <div
                  style={{ color: text, textDecorationColor: text }}
                  className={cn(
                    `text-base truncate opacity-60 group-hover:underline`,
                    {
                      "text-xs": size === "sm",
                      "text-lg": size === "lg",
                    }
                  )}
                >
                  {artist}
                </div>
              )}
            </div>
          </div>
        </a>
      ) : (
        "make sure you have logged in at least once then refresh"
      )}
    </>
  );
}
