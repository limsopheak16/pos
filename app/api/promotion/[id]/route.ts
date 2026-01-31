import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log("params:", params); // Debug params
  const { id } = await params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(
      { error: "Invalid or missing ID" },
      { status: 400 }
    );
  }

  const promotion = await prisma.promotion.findUnique({
    where: { id: String(id) },
  });

  if (!promotion) {
    return NextResponse.json({ error: "Promotion not found" }, { status: 404 });
  }

  return NextResponse.json(promotion);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(
      { error: "Invalid or missing ID" },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();
    const {
      promotionCode,
      description,
      startDate,
      endDate,
      discountPercentage,
    } = body;

    const updatedPromotion = await prisma.promotion.update({
      where: { id: String(id) },
      data: {
        promotionCode,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        discountPercentage,
      },
    });

    return NextResponse.json({
      message: "Promotion updated successfully!",
      updatedPromotion,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to update promotion",
        details: (error as Error).message,
      },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(
      { error: "Invalid or missing ID" },
      { status: 400 }
    );
  }

  try {
    const deletedPromotion = await prisma.promotion.delete({
      where: { id: String(id) },
    });

    return NextResponse.json({
      message: "Promotion deleted successfully!",
      deletedPromotion,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to delete promotion",
        details: (error as Error).message,
      },
      { status: 400 }
    );
  }
}
