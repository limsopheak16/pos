import prisma from "@/lib/prisma";
import { NextRequest,NextResponse } from "next/server";

import { Decimal } from "@prisma/client/runtime/library";



export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const body = await request.json();
        const { supplierId, referenceNumber, stockInDate, stockInDetails } = body;
        stockInDetails.map(async (detail: StockInDetail) => {
            const result = await prisma.stockInDetail.update({
                where: {id: String(detail.id)},
                data:{
                 productId: String(detail.productId),
                quantity: detail.quantity,
                purchaseUnitPrice: detail.purchaseUnitPrice.toString(), 
                saleUnitPrice: detail.saleUnitPrice.toString(), 
                expiryDate: detail.expiryDate ? new Date(detail.expiryDate) : null,
                }
            });
            return result;
        });

        const updateStockin = await prisma.stockIn.update({
            where: { id: String(id) },
            data: {
                supplierId,
                referenceNumber,
                stockInDate: new Date(stockInDate),
            }
        });
        // console.log(updateStockin);
        return NextResponse.json({ message: "Stock-in updated successfully", data: {master: updateStockin, detail: stockInDetails} });
    } catch (error) {
        console.error("Error updating stock-in:", error);
        return NextResponse.json({ message: "Failed to update stock-in"}, { status: 500 });
    }
}

export async function DELETE(request:NextRequest, {params}:{params:Promise<{id:string}>}) {
    const {id}=await params;
    try{

        const deleteRelate= await prisma.stockInDetail.deleteMany({
            where:{stockInId:String(id)}
        })
        const deleteStockIn = await prisma.stockIn.delete({
            where: { id: String(id) },
        });
        return NextResponse.json({ message: "deleted stock success",data: deleteStockIn  })

    }catch(error){
        console.log(error)
        return NextResponse.json({ message: "delete failed!"  }, {status: 500})
    }
    
}

export interface StockInDetail {
    id: string;
    quantity: number;
    purchaseUnitPrice: Decimal;
    saleUnitPrice: Decimal;
    expiryDate: Date | null;
    productId: string;
    productName: string;
}

export interface StockInMaster {
    id: string;
    supplierId: string;
    referenceNumber: string;
    stockInDate: Date;
    stockInDetails: StockInDetail[];
    supplierName:string;
}



export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    console.log(request)
    const { id } = await params;
    try {
        const master = await prisma.stockIn.findUnique({
            where: {
                id: String(id),
            },
            include: {
                stockInDetails: {
                    include: {
                        product: true, 
                        
                    }
                },supplier:true,
            },
        });
        if (master) {

            const data: StockInMaster = {
                id: master?.id,
                referenceNumber: master?.referenceNumber,
                stockInDate: master?.stockInDate,
                supplierId: master?.supplierId,
                supplierName:master?.supplier.supplierName,
                stockInDetails: master?.stockInDetails.map(item => {
                    const detail: StockInDetail = {
                        id: item.id,
                        quantity: item.quantity,
                        purchaseUnitPrice: item.purchaseUnitPrice,
                        saleUnitPrice: item.saleUnitPrice,
                        expiryDate: item.expiryDate,
                        productId: item.productId,
                        productName: item.product.nameEn + " " + item.product.nameKh,
                    }
                    return detail;
                })
            }
            return NextResponse.json({ message: "get unique stock success", data })
        }else{
            return NextResponse.json({ message: "Purchase master was not found" }, {status: 400})
        }


    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "delete failed!" }, { status: 500 })
    }

}
