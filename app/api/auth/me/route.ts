import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/auth/stateless-session";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    // Get session from cookie
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    
    if (!sessionCookie) {
      return NextResponse.json(
        { message: "No session found" },
        { status: 401 }
      );
    }

    // Decrypt session to get userId
    const session = await decrypt(sessionCookie);
    if (!session?.userId) {
      return NextResponse.json(
        { message: "Invalid session" },
        { status: 401 }
      );
    }

    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      include: { role: true },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Return user data (without password)
    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role.name,
      roleId: user.roleId,
      imageUrl: user.imageUrl,
      isActive: user.isActive,
    };

    return NextResponse.json({ message: "Success", data: userData });
  } catch (error) {
    console.error("Error fetching current user:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
