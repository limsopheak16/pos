import { useState, useEffect } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  imageUrl?: string | null;
  isActive: boolean;
}

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      // Get the current user ID from the session
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const userData = await response.json();
        setUser(userData.data);
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, refetch: fetchCurrentUser };
}
