import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export function encodeEmail(email: string) {
  return Buffer.from(email).toString("base64");
}

export function decodeEmail(encodedEmail: string) {
  return Buffer.from(encodedEmail, "base64").toString("utf-8");
}
