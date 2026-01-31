import React from "react";
import PageWrapper from "@/components/page-wrapper";
import { PageTableView } from "./page-tableview";
import { StockInStats } from "@/components/dashboard/stockin-stats";
import { staticStockIns } from "@/data/static-data";

const StockIn = async ({ searchParams }: { searchParams: Promise<Record<string, string>> }) => {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || "1");
  
  // Simulate pagination with static data
  const pageSize = 12;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedStockIns = staticStockIns.slice(startIndex, endIndex);

  const data = {
    pageSize,
    currentPage: page,
    prevPage: page > 1 ? page - 1 : 0,
    nextPage: endIndex < staticStockIns.length ? page + 1 : 0,
    totalItems: staticStockIns.length,
    totalPages: Math.ceil(staticStockIns.length / pageSize),
    records: paginatedStockIns.map(stockIn => ({
      id: parseInt(stockIn.id.replace('STK', '')),
      supplierId: parseInt(stockIn.supplierId.replace('SUP', '')),
      referenceNumber: stockIn.purchaseOrderNumber || `STK${stockIn.id}`,
      stockInDate: new Date(stockIn.date),
      supplierName: stockIn.supplierName,
      numberOfItems: stockIn.quantity,
      purchaseAmount: parseFloat(stockIn.totalPrice)
    }))
  };

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Stock Management</h1>
            <p className="text-gray-600 mt-1">Track and manage inventory movements and stock levels</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Total Stock Ins:</span>
            <span className="text-lg font-bold text-blue-600">{staticStockIns.length}</span>
          </div>
        </div>
        
        <StockInStats />
        
        <PageTableView title="Stock Transactions" data={data} />
      </div>
    </PageWrapper>
  );
};

export default StockIn;
