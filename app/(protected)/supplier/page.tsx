import React from "react";
import PageWrapper from "@/components/page-wrapper";
import { SupplierTable } from "./supplier-table";
import { SupplierStats } from "@/components/dashboard/supplier-stats";
import { staticSuppliers } from "@/data/static-data";

const SupplierPage = async ({ searchParams }: { searchParams: Promise<Record<string, string>> }) => {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || "1", 10);

  // Simulate pagination with static data
  const pageSize = 12;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedSuppliers = staticSuppliers.slice(startIndex, endIndex);

  const data = {
    pageSize,
    currentPage: page,
    prevPage: page > 1 ? page - 1 : 0,
    nextPage: endIndex < staticSuppliers.length ? page + 1 : 0,
    totalItems: staticSuppliers.length,
    totalPages: Math.ceil(staticSuppliers.length / pageSize),
    records: paginatedSuppliers.map(supplier => ({
      id: parseInt(supplier.id.replace('SUP', '')),
      supplierName: supplier.name,
      contactName: supplier.contactPerson,
      contactEmail: supplier.email,
      contactPhone: supplier.phone,
      addressLine1: supplier.address,
      addressLine2: "",
      province: "SC",
      websiteUrl: supplier.website,
      imageUrl: undefined,
      taxIdentification: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      StockIn: null
    }))
  };

  // Calculate professional stats
  const stats = {
    totalSuppliers: staticSuppliers.length,
    categories: [...new Set(staticSuppliers.map(s => s.category))].length,
    topRated: staticSuppliers.filter(s => s.rating === 'A+').length,
    averageRevenue: staticSuppliers.reduce((sum, s) => sum + s.annualRevenue, 0) / staticSuppliers.length,
    totalProducts: staticSuppliers.reduce((sum, s) => sum + s.products, 0),
    averageReliability: staticSuppliers.reduce((sum, s) => sum + s.reliability, 0) / staticSuppliers.length,
    certifiedSuppliers: staticSuppliers.filter(s => s.certifications.length > 0).length,
    totalOrders: staticSuppliers.reduce((sum, s) => sum + s.totalOrders, 0),
    totalSpent: staticSuppliers.reduce((sum, s) => sum + s.totalSpent, 0)
  };

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Supplier Management</h1>
            <p className="text-gray-600 mt-1">Manage your supplier relationships and performance metrics</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Total Suppliers:</span>
            <span className="text-lg font-bold text-blue-600">{staticSuppliers.length}</span>
          </div>
        </div>
        
        <SupplierStats />
        
        <SupplierTable title="Supplier Directory" data={data} />
      </div>
    </PageWrapper>
  );
};

export default SupplierPage;