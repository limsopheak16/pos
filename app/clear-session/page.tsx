"use client";

import { useState } from "react";

export default function ClearSessionPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const clearSession = async () => {
    setLoading(true);
    setMessage("");
    
    try {
      // Call server-side session clearing
      const response = await fetch("/api/clear-session", {
        method: "POST",
      });
      
      const result = await response.json();
      
      // Clear all client-side storage
      document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost;";
      localStorage.clear();
      sessionStorage.clear();
      
      if (response.ok) {
        setMessage("✅ All sessions cleared! Now try accessing /dashboard directly.");
        
        // Force redirect to home page
        setTimeout(() => {
          window.location.replace("/");
        }, 2000);
      } else {
        setMessage("❌ Failed to clear session");
      }
    } catch (error) {
      setMessage("❌ Error: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Clear Session for Testing
        </h1>
        
        <p className="text-gray-600 mb-6">
          This will clear your authentication session so you can test the security properly.
        </p>
        
        {message && (
          <div className={`p-3 rounded mb-4 ${
            message.includes("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {message}
          </div>
        )}
        
        <button
          onClick={clearSession}
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? "Clearing..." : "Clear Session"}
        </button>
        
        <div className="mt-4 text-sm text-gray-500">
          <p><strong>Test Steps:</strong></p>
          <ol className="list-decimal list-inside mt-2">
            <li>Click "Clear Session"</li>
            <li>Try accessing /dashboard directly</li>
            <li>You should be redirected to /login</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
