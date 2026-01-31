import { NextResponse } from "next/server";
import { staticAnalytics } from "@/data/static-data";

export async function GET() {
  try {
    return NextResponse.json({ 
      message: "Success", 
      data: staticAnalytics 
    });
  } catch (error) {
    console.error("Error fetching static analytics:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
