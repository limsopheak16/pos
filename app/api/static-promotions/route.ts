import { NextRequest, NextResponse } from "next/server";
import { staticPromotions } from "@/data/static-data";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const currentPage = parseInt(searchParams.get("currentPage") || "1");

    // Simulate pagination
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedPromotions = staticPromotions.slice(startIndex, endIndex);

    const data = {
      pageSize,
      currentPage,
      prevPage: currentPage > 1 ? currentPage - 1 : null,
      nextPage: endIndex < staticPromotions.length ? currentPage + 1 : null,
      totalItems: staticPromotions.length,
      totalPages: Math.ceil(staticPromotions.length / pageSize),
      records: paginatedPromotions
    };

    return NextResponse.json({ message: "Success", data });
  } catch (error) {
    console.error("Error fetching static promotions:", error);
    return NextResponse.json(
      { message: "Something went wrong", data: [] },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const promotionData = await req.json();
    
    // Simulate creating a new promotion
    const newPromotion = {
      id: `PROM${String(staticPromotions.length + 1).padStart(3, '0')}`,
      ...promotionData,
      status: 'Active'
    };

    return NextResponse.json({ 
      message: "Promotion created successfully", 
      data: newPromotion 
    });
  } catch (error) {
    console.error("Error creating static promotion:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
