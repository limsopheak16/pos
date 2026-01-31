"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useStaticUser } from "@/hooks/use-static-user";

export default function Header() {
  const { user, loading } = useStaticUser();

  return (
    <header className="w-full">
      <div className="px-4 py-4 flex justify-between items-center">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/dashboard" className="text-foreground">
                Dashboard
              </Link>
            </li>
          </ol>
        </nav>
        <div className="flex items-center space-x-4">
          {loading ? (
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          ) : user ? (
            <Avatar>
              <AvatarImage src={user.imageUrl || ""} alt={user.username} />
              <AvatarFallback>
                {user.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Avatar>
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </header>
  );
}
