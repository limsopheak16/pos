import { NextRequest, NextResponse } from "next/server";
import { staticStockIns } from "@/data/static-data";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const currentPage = parseInt(searchParams.get("currentPage") || "1");

    // Simulate pagination
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedStockIns = staticStockIns.slice(startIndex, endIndex);

    const data = {
      pageSize,
      currentPage,
      prevPage: currentPage > 1 ? currentPage - 1 : null,
      nextPage: endIndex < staticStockIns.length ? currentPage + 1 : null,
      totalItems: staticStockIns.length,
      totalPages: Math.ceil(staticStockIns.length / pageSize),
      records: paginatedStockIns
    };

    return NextResponse.json({ message: "Success", data });
  } catch (error) {
    console.error("Error fetching static stock ins:", error);
    return NextResponse.json(
      { message: "Something went wrong", data: [] },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const stockInData = await req.json();
    
    // Simulate creating a new stock in
    const newStockIn = {
      id: `STK${String(staticStockIns.length + 1).padStart(3, '0')}`,
      ...stockInData,
      status: 'Received'
    };

    return NextResponse.json({ 
      message: "Stock in created successfully", 
      data: newStockIn 
    });
  } catch (error) {
    console.error("Error creating static stock in:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
