"use client";

import { signIn } from "next-auth/react";

export function SpotifySignIn() {
  return (
    <section className="flex flex-col items-center gap-4">
      <button
        className="relative group overflow-hidden text-background text-lg font-bold bg-spotify px-8 py-4 rounded-full"
        onClick={() => signIn("spotify")}
      >
        <div className="absolute inset-0 group-hover:bg-[#3be477] transition-colors duration-150 z-0"></div>
        <div className="absolute inset-0 group-active:bg-[#1abc54] transition-colors duration-150 z-0"></div>
        <div className="relative z-10">
          Sign in with Spotify
          {/* TODO: replace the button label with some of the most popular lyrics */}
        </div>
      </button>
      <p className="text-sm text-zinc-400">to get started 🤘🏻</p>
    </section>
  );
}
