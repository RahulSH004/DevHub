"use client";

import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "../ui/button";

export function LoginButton() {
  return (
    <Link
      href="/sign-in"
      className={buttonVariants({ variant: "default", size: "sm" })}
    >
      Sign In
    </Link>
  );
}

// Minimal Dropdown with only Profile (Avatar) and Sign Out
export function UserDropdown({ user }: { user: { name: string; image?: string | null } }) {
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer outline-none rounded-full">
        <Avatar className="h-8 w-8 border">
          <AvatarImage src={user.image || undefined} alt={user.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-32 mt-2">
        <DropdownMenuItem 
          onClick={handleLogout} 
          className="text-destructive focus:bg-destructive focus:text-destructive-foreground cursor-pointer text-center justify-center font-medium"
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
