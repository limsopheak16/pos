import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("session");
    
    return NextResponse.json({ 
      message: "Session cleared successfully" 
    });
  } catch (error) {
    console.error("Error clearing session:", error);
    return NextResponse.json(
      { message: "Failed to clear session" },
      { status: 500 }
    );
  }
}
