import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const supplier = await prisma.supplier.findUnique({
            where: { id: String(id) },
        });
        return NextResponse.json({ message: "get unique supplier success", data: supplier })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "get id failed!" }, { status: 500 })
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log("id", id);
    try {
        const body = await request.json();
        console.log(body);
        const updatedSupplier = await prisma.supplier.update({
            where: { id: String(id) },
            data: body, // Expecting body to contain supplier fields to update
        });
        return NextResponse.json({ message: "Supplier updated successfully", data: updatedSupplier });
    } catch (error) {
        console.error("Error updating supplier:", error);
        return NextResponse.json({ message: "Update failed!" }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const deletedSupplier = await prisma.supplier.delete({
            where: { id: String(id) },
        });

        console.log('====>', deletedSupplier)
        return NextResponse.json({ message: "Supplier deleted successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error deleting supplier:", error);
        return NextResponse.json({ message: "delete failed!" }, { status: 500 })
    }
}