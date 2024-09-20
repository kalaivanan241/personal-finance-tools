"use client";
"}{:";
import { signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogOut } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  const handleLogout = async () => {
    await signOut();
  };

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
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
