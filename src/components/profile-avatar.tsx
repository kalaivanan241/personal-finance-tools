"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ProfileAvatar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="w-10 h-10 rounded-full p-0">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={session?.user?.image ?? ""}
              alt={session?.user?.name ?? ""}
            />
            <AvatarFallback>{session?.user?.name}</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Profile</h4>
            <p className="text-sm text-muted-foreground">
              Manage your account settings
            </p>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={session?.user?.image ?? ""}
                  alt={session?.user?.name ?? ""}
                />
                <AvatarFallback>{session?.user?.name}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {session?.user?.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session?.user?.email}
                </p>
              </div>
            </div>
            <Button variant="outline" className="w-full justify-start" asChild>
              <a href="/profile">
                <User className="mr-2 h-4 w-4" />
                View Profile
              </a>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
