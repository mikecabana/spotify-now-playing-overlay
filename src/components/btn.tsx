"use client";

import { cn } from "@/lib/utils";
import NextLink from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type BtnProps = {
  children: ReactNode;
  href?: string;
  target?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Btn({ children, href, target, className, ...props }: BtnProps) {
  return href ? (
    <NextLink
      href={href}
      target={target}
      className={cn(
        "font-bold rounded-full px-4 py-2 text-spotify hover:text-background hover:bg-spotify active:bg-spotify-press transition",
        className
      )}
    >
      {children}
    </NextLink>
  ) : (
    <button
      className={cn(
        "font-bold rounded-full px-4 py-2 text-spotify hover:text-background hover:bg-spotify active:bg-spotify-press transition",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
