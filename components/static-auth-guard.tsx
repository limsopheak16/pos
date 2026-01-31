"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStaticUser } from "@/hooks/use-static-user";

interface StaticAuthGuardProps {
  children: React.ReactNode;
}

export function StaticAuthGuard({ children }: StaticAuthGuardProps) {
  const { user, loading } = useStaticUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login if no user found
      router.push("/login");
    }
  }, [user, loading, router]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show children if user is authenticated
  if (user) {
    return <>{children}</>;
  }

  // Return null while redirecting
  return null;
}
