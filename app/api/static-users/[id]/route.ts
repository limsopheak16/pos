import { NextRequest, NextResponse } from "next/server";
import { staticUsers } from "@/data/static-data";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = staticUsers.find(u => u.id === id);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Success", data: user });
  } catch (error) {
    console.error("Error fetching static user:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updateData = await req.json();
    
    // Simulate updating user (in static demo, just return success)
    const updatedUser = {
      id: id,
      ...updateData
    };

    return NextResponse.json({ 
      message: "User updated successfully", 
      data: updatedUser 
    });
  } catch (error) {
    console.error("Error updating static user:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Simulate deleting user (in static demo, just return success)
    return NextResponse.json({ 
      message: "User deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting static user:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
