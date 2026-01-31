import { NextRequest, NextResponse } from "next/server";
import { staticProducts } from "@/data/static-data";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const currentPage = parseInt(searchParams.get("currentPage") || "1");

    // Simulate pagination
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = staticProducts.slice(startIndex, endIndex);

    const data = {
      pageSize,
      currentPage,
      prevPage: currentPage > 1 ? currentPage - 1 : null,
      nextPage: endIndex < staticProducts.length ? currentPage + 1 : null,
      totalItems: staticProducts.length,
      totalPages: Math.ceil(staticProducts.length / pageSize),
      records: paginatedProducts
    };

    return NextResponse.json({ message: "Success", data });
  } catch (error) {
    console.error("Error fetching static products:", error);
    return NextResponse.json(
      { message: "Something went wrong", data: [] },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const productData = await req.json();
    
    // Simulate creating a new product
    const newProduct = {
      id: `PRD${String(staticProducts.length + 1).padStart(3, '0')}`,
      ...productData,
      stock: productData.stock || 100,
      status: 'In Stock'
    };

    return NextResponse.json({ 
      message: "Product created successfully", 
      data: newProduct 
    });
  } catch (error) {
    console.error("Error creating static product:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
