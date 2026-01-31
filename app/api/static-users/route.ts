import { NextRequest, NextResponse } from "next/server";
import { staticUsers } from "@/data/static-data";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const currentPage = parseInt(searchParams.get("currentPage") || "1");

    // Simulate pagination
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedUsers = staticUsers.slice(startIndex, endIndex);

    const data = {
      pageSize,
      currentPage,
      prevPage: currentPage > 1 ? currentPage - 1 : null,
      nextPage: endIndex < staticUsers.length ? currentPage + 1 : null,
      totalItems: staticUsers.length,
      totalPages: Math.ceil(staticUsers.length / pageSize),
      records: paginatedUsers
    };

    return NextResponse.json({ message: "Success", data });
  } catch (error) {
    console.error("Error fetching static users:", error);
    return NextResponse.json(
      { message: "Something went wrong", data: [] },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const userData = await req.json();
    
    // Simulate creating a new user (in real static demo, just return success)
    const newUser = {
      id: String(staticUsers.length + 1),
      ...userData,
      isActive: true
    };

    return NextResponse.json({ 
      message: "User created successfully", 
      data: newUser 
    });
  } catch (error) {
    console.error("Error creating static user:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
