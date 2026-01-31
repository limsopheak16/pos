import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "API is working!",
    timestamp: new Date().toISOString(),
    testCredentials: [
      { email: "admin@ariya.com", password: "admin123" },
      { email: "manager@ariya.com", password: "manager123" },
      { email: "cashier@ariya.com", password: "cashier123" }
    ]
  });
}
