import { useState, useEffect } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  roleId: string;
  imageUrl?: string | null;
  isActive: boolean;
}

export function useStaticUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Clear any existing cookies
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Get user from localStorage for static demo
    const staticUser = localStorage.getItem("staticUser");
    const staticToken = localStorage.getItem("staticToken");

    if (staticUser && staticToken) {
      try {
        setUser(JSON.parse(staticUser));
      } catch (error) {
        console.error("Error parsing static user:", error);
        localStorage.removeItem("staticUser");
        localStorage.removeItem("staticToken");
      }
    }

    setLoading(false);
  }, []);

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem("staticUser");
    localStorage.removeItem("staticToken");
    
    // Clear any cookies
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    window.location.href = "/login";
  };

  return { user, loading, logout };
}
