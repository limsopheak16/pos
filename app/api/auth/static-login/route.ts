import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiting for development
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  
  try {
    const { email, password } = await req.json();

    console.log(`[${new Date().toISOString()}] Static login attempt for: ${email}`);

    // Simple rate limiting (max 5 attempts per minute per email)
    const now = Date.now();
    const attempts = loginAttempts.get(email) || { count: 0, lastAttempt: 0 };
    
    if (now - attempts.lastAttempt < 60000) { // 1 minute window
      if (attempts.count >= 5) {
        console.log(`[${new Date().toISOString()}] Rate limited for: ${email}`);
        return NextResponse.json(
          { message: "Too many login attempts. Please try again later." },
          { status: 429 }
        );
      }
      attempts.count++;
    } else {
      attempts.count = 1;
    }
    attempts.lastAttempt = now;
    loginAttempts.set(email, attempts);

    // Hardcoded demo credentials for testing
    const validCredentials = [
      { email: "admin@ariya.com", password: "admin123", role: "Administrator", id: "USR001" },
      { email: "manager@ariya.com", password: "manager123", role: "Manager", id: "USR002" },
      { email: "cashier@ariya.com", password: "cashier123", role: "Cashier", id: "USR003" }
    ];

    const validUser = validCredentials.find(cred => cred.email === email && cred.password === password);

    console.log(`[${new Date().toISOString()}] Valid credentials for ${email}:`, validUser ? 'YES' : 'NO');

    if (!validUser) {
      console.log(`[${new Date().toISOString()}] Invalid credentials for: ${email}`);
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Clear successful login attempts
    loginAttempts.delete(email);

    const endTime = Date.now();
    console.log(`[${new Date().toISOString()}] Static login successful for: ${email} (${endTime - startTime}ms)`);

    // Return user data (simulating successful login)
    return NextResponse.json({ 
      message: "Login successful", 
      data: {
        user: {
          id: validUser.id,
          email: validUser.email,
          username: validUser.email.split('@')[0],
          role: validUser.role,
          roleId: validUser.role === "Administrator" ? "1" : validUser.role === "Manager" ? "2" : "3",
          imageUrl: null,
          isActive: true
        },
        token: "static-demo-token-" + Date.now()
      }
    });

  } catch (error) {
    console.error(`[${new Date().toISOString()}] Static login error:`, error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
