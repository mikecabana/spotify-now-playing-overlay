'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

type BtnProps = { children: ReactNode; href?: string; target?: string } & ButtonHTMLAttributes<HTMLButtonElement>;

export const Btn: FC<BtnProps> = ({ children, href, target, className, ...props }) => {
    return href ? (
        <Link
            href={href}
            target={target}
            className={cn(
                'font-bold rounded-2xl px-4 py-2 text-fern-500 border border-transparent hover:border-fern-500 hover:bg-fern-300 hover:bg-opacity-20 active:bg-fern-300 active:bg-opacity-30 dark:hover:text-fern-400 dark:hover:bg-fern-500 dark:hover:bg-opacity-20 dark:active:bg-fern-500 dark:active:bg-opacity-30 transition',
                className
            )}
        >
            {children}
        </Link>
    ) : (
        <button
            className={cn(
                'font-bold rounded-2xl px-4 py-2 text-fern-500 border border-transparent hover:border-fern-500 hover:bg-fern-300 hover:bg-opacity-20 active:bg-fern-300 active:bg-opacity-30 dark:hover:text-fern-400 dark:hover:bg-fern-500 dark:hover:bg-opacity-20 dark:active:bg-fern-500 dark:active:bg-opacity-30 transition',
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};
