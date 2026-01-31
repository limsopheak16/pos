import { NextResponse } from "next/server";
import { staticRoles } from "@/data/static-data";

export async function GET() {
  try {
    return NextResponse.json({ 
      message: "Success", 
      data: staticRoles 
    });
  } catch (error) {
    console.error("Error fetching static roles:", error);
    return NextResponse.json(
      { message: "Something went wrong", 
        data: [] },
      { status: 500 }
    );
  }
}
