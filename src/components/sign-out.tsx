"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Btn } from "./btn";

export function SignOut() {
  return (
    <Btn onClick={() => signOut()} className="flex items-center">
      Log out
      <LogOut className="w-4 h-4 ml-2" />
    </Btn>
  );
}
