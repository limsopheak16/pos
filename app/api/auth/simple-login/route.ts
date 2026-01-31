import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    console.log("Simple login attempt:", email);

    // Very simple hardcoded check
    if (
      (email === "admin@ariya.com" && password === "admin123") ||
      (email === "manager@ariya.com" && password === "manager123") ||
      (email === "cashier@ariya.com" && password === "cashier123")
    ) {
      const user = {
        id: email === "admin@ariya.com" ? "1" : email === "manager@ariya.com" ? "2" : "3",
        email: email,
        username: email.split("@")[0],
        role: email === "admin@ariya.com" ? "Administrator" : email === "manager@ariya.com" ? "Manager" : "Cashier",
        roleId: email === "admin@ariya.com" ? "1" : email === "manager@ariya.com" ? "2" : "3",
        imageUrl: null,
        isActive: true
      };

      return NextResponse.json({
        message: "Login successful",
        data: {
          user: user,
          token: "simple-token-" + Date.now()
        }
      });
    }

    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );

  } catch (error) {
    console.error("Simple login error:", error);
    return NextResponse.json(
      { message: "Login failed" },
      { status: 500 }
    );
  }
}
