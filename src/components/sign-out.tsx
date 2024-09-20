"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export function SignOut() {
  return (
    <Button onClick={() => signOut()} variant={"outline"} size={"sm"}>
      <LogOut className="mr-2 h-4 w-4" />
      Sign Out
    </Button>
  );
}
