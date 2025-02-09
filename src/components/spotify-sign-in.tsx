'use client';

import { signIn } from 'next-auth/react';
import React from 'react';

type SpotifySignInProps = {
    children?: React.ReactNode;
};

export function SpotifySignIn({ children }: SpotifySignInProps) {
    return (
        <button
            className="relative group overflow-hidden text-background text-lg font-bold bg-spotify px-8 py-4 rounded-full"
            onClick={() => signIn('spotify')}
        >
            <div className="absolute inset-0 group-hover:bg-[#3be477] transition-colors duration-150 z-0"></div>
            <div className="absolute inset-0 group-active:bg-[#1abc54] transition-colors duration-150 z-0"></div>
            <div className="relative z-10">
                {children ?? 'Sign in with Spotify'}
                {/* TODO: replace the button label with some of the most popular lyrics */}
            </div>
        </button>
    );
}
