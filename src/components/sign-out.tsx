'use client';

import { signOut } from 'next-auth/react';
import { FC, ReactNode } from 'react';

export const SignOut: FC<{ children: ReactNode }> = ({ children }) => {
    return <button className="text-[#1DB954] hover:underline active:underline" onClick={() => signOut()}>{children}</button>;
};
