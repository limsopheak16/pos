import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        await prisma.customer.delete({
            where: { id: String(id) },
        });

        return NextResponse.json({ message: "Customer deleted successfully!" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete customer", details: (error as Error).message }, { status: 400 });
    }
}