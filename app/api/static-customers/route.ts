import { NextRequest, NextResponse } from "next/server";
import { staticCustomers } from "@/data/static-data";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const currentPage = parseInt(searchParams.get("currentPage") || "1");

    // Simulate pagination
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedCustomers = staticCustomers.slice(startIndex, endIndex);

    const data = {
      pageSize,
      currentPage,
      prevPage: currentPage > 1 ? currentPage - 1 : null,
      nextPage: endIndex < staticCustomers.length ? currentPage + 1 : null,
      totalItems: staticCustomers.length,
      totalPages: Math.ceil(staticCustomers.length / pageSize),
      records: paginatedCustomers
    };

    return NextResponse.json({ message: "Success", data });
  } catch (error) {
    console.error("Error fetching static customers:", error);
    return NextResponse.json(
      { message: "Something went wrong", data: [] },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const customerData = await req.json();
    
    // Simulate creating a new customer
    const newCustomer = {
      id: `CUST${String(staticCustomers.length + 1).padStart(3, '0')}`,
      ...customerData,
      totalOrders: 0,
      totalSpent: 0
    };

    return NextResponse.json({ 
      message: "Customer created successfully", 
      data: newCustomer 
    });
  } catch (error) {
    console.error("Error creating static customer:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
