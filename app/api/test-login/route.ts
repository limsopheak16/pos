import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    console.log("Test login attempt:", { email, password });

    // Hardcoded test credentials
    const validCredentials = [
      { email: "admin@ariya.com", password: "admin123", role: "Administrator" },
      { email: "manager@ariya.com", password: "manager123", role: "Manager" },
      { email: "cashier@ariya.com", password: "cashier123", role: "Cashier" }
    ];

    const validUser = validCredentials.find(cred => cred.email === email && cred.password === password);

    if (validUser) {
      console.log("Test login successful for:", email);
      return NextResponse.json({ 
        message: "Login successful", 
        data: {
          user: {
            id: "TEST001",
            email: validUser.email,
            role: validUser.role,
            username: validUser.email.split('@')[0],
            isActive: true
          },
          token: "test-token-" + Date.now()
        }
      });
    } else {
      console.log("Test login failed for:", email);
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error("Test login error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
