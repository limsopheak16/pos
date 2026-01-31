import { NextResponse } from "next/server";
import { staticUsers, demoCredentials } from "@/data/static-data";

export async function GET() {
  try {
    const adminUser = staticUsers.find(u => u.email === "admin@ariya.com");
    const managerUser = staticUsers.find(u => u.email === "manager@ariya.com");
    const cashierUser = staticUsers.find(u => u.email === "cashier@ariya.com");

    return NextResponse.json({
      message: "Debug info",
      data: {
        totalUsers: staticUsers.length,
        demoCredentials: demoCredentials,
        adminUser: adminUser ? {
          id: adminUser.id,
          email: adminUser.email,
          role: adminUser.role,
          isActive: adminUser.isActive
        } : null,
        managerUser: managerUser ? {
          id: managerUser.id,
          email: managerUser.email,
          role: managerUser.role,
          isActive: managerUser.isActive
        } : null,
        cashierUser: cashierUser ? {
          id: cashierUser.id,
          email: cashierUser.email,
          role: cashierUser.role,
          isActive: cashierUser.isActive
        } : null,
        firstFiveUsers: staticUsers.slice(0, 5).map(u => ({
          id: u.id,
          email: u.email,
          role: u.role
        }))
      }
    });
  } catch (error) {
    console.error("Debug endpoint error:", error);
    return NextResponse.json(
      { message: "Debug error", error: error.message },
      { status: 500 }
    );
  }
}
