"use client";
import { User } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignIn() {
  return (
    <Button onClick={() => signIn("google")} variant="outline" size={"sm"}>
      <User className="mr-2 h-4 w-4" />
      Login
    </Button>
  );
}
