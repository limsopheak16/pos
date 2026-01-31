import { NextRequest, NextResponse } from "next/server";
import { staticSuppliers } from "@/data/static-data";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const currentPage = parseInt(searchParams.get("currentPage") || "1");

    // Simulate pagination
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedSuppliers = staticSuppliers.slice(startIndex, endIndex);

    const data = {
      pageSize,
      currentPage,
      prevPage: currentPage > 1 ? currentPage - 1 : null,
      nextPage: endIndex < staticSuppliers.length ? currentPage + 1 : null,
      totalItems: staticSuppliers.length,
      totalPages: Math.ceil(staticSuppliers.length / pageSize),
      records: paginatedSuppliers
    };

    return NextResponse.json({ message: "Success", data });
  } catch (error) {
    console.error("Error fetching static suppliers:", error);
    return NextResponse.json(
      { message: "Something went wrong", data: [] },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const supplierData = await req.json();
    
    // Simulate creating a new supplier
    const newSupplier = {
      id: `SUP${String(staticSuppliers.length + 1).padStart(3, '0')}`,
      ...supplierData,
      products: 0
    };

    return NextResponse.json({ 
      message: "Supplier created successfully", 
      data: newSupplier 
    });
  } catch (error) {
    console.error("Error creating static supplier:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
