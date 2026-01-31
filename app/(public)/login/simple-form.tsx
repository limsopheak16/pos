"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export function SimpleLoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loading) return;
    
    setLoading(true);
    setError("");

    try {
      console.log("Attempting simple login...");
      
      const response = await fetch("/api/auth/simple-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Simple login successful!");
        
        // Store user info in localStorage
        localStorage.setItem("staticUser", JSON.stringify(result.data.user));
        localStorage.setItem("staticToken", result.data.token);
        
        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        console.log("Simple login failed:", result.message);
        setError(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Simple login error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="admin@ariya.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="admin123"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        {error && (
          <p className="text-sm text-red-500 mt-2">{error}</p>
        )}

        <Button 
          type="submit" 
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </Button>

        <div className="mt-4 p-3 bg-gray-50 rounded text-xs">
          <p className="font-semibold mb-2">Demo Credentials:</p>
          <div className="space-y-1">
            <p><strong>Admin:</strong> admin@ariya.com / admin123</p>
            <p><strong>Manager:</strong> manager@ariya.com / manager123</p>
            <p><strong>Cashier:</strong> cashier@ariya.com / cashier123</p>
          </div>
        </div>
      </div>
    </form>
  );
}
