"use client";
import { SignOut } from "@/components/sign-out";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <Avatar className="h-32 w-32">
              <AvatarImage
                src={session?.user?.image ?? ""}
                alt={session?.user?.name ?? ""}
              />
              <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Name</label>
              <p className="mt-1 text-lg font-semibold">
                {session?.user?.name}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="mt-1 text-lg font-semibold">
                {session?.user?.email}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SignOut />
        </CardFooter>
      </Card>
    </div>
  );
}
