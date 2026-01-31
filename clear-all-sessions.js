// Simple script to clear all sessions
console.log("Clearing all sessions...");

// Clear server-side session cookie
document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost;";

// Clear localStorage
localStorage.clear();

// Clear sessionStorage
sessionStorage.clear();

console.log("All sessions cleared! Redirecting to home page...");

// Redirect to home page
window.location.href = "/";
