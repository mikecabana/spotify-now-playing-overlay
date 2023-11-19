'use client'

import { signIn } from 'next-auth/react';
import { FC, ReactNode } from 'react';

export const SpotifySignIn: FC<{ children: ReactNode }> = ({ children }) => {
    return <button className="text-[#1DB954] hover:underline active:underline" onClick={() => signIn('spotify')}>{children}</button>;
};
