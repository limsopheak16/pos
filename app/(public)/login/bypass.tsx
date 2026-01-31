"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function LoginBypass() {
  const router = useRouter();

  useEffect(() => {
    // Clear all cookies first
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Auto-login as admin for demo
    const adminUser = {
      id: "1",
      email: "admin@ariya.com",
      username: "admin",
      role: "Administrator",
      roleId: "1",
      imageUrl: null,
      isActive: true
    };

    localStorage.setItem("staticUser", JSON.stringify(adminUser));
    localStorage.setItem("staticToken", "bypass-token-" + Date.now());
    
    console.log("Auto-login bypass activated! All cookies cleared.");
    
    // Redirect to dashboard after 1 second
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold">Auto-logging in for demo...</h2>
        <p className="text-gray-600 mt-2">Welcome to Ariya Mart!</p>
        <p className="text-xs text-gray-500 mt-1">All cookies cleared - using localStorage only</p>
      </div>
    </div>
  );
}
