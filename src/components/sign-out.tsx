'use client';

import { signOut } from 'next-auth/react';
import { FC, ReactNode } from 'react';
import { Btn } from './btn';
import { LogOut } from 'lucide-react';

export const SignOut: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Btn onClick={() => signOut()} className='flex items-center'>
            {children}
            <LogOut className='w-4 h-4 ml-2' />
        </Btn>
    );
};
