import React from "react";
import PageWrapper from "@/components/page-wrapper";
import { PageTableView } from "./promotion-table";
import { PromotionStats } from "@/components/dashboard/promotion-stats";
import { staticPromotions } from "@/data/static-data";

interface PromotionPageProps {
  searchParams: Promise<Record<string, string>>;
}

const PromotionPage: React.FC<PromotionPageProps> = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || "1");

  // Simulate pagination with static data
  const pageSize = 12;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedPromotions = staticPromotions.slice(startIndex, endIndex);

  const data = {
    pageSize,
    currentPage: page,
    prevPage: page > 1 ? page - 1 : 0,
    nextPage: endIndex < staticPromotions.length ? page + 1 : 0,
    totalItems: staticPromotions.length,
    totalPages: Math.ceil(staticPromotions.length / pageSize),
    records: paginatedPromotions.map(promotion => ({
      id: parseInt(promotion.id.replace('PROM', '')),
      promotionCode: promotion.couponCode || `PROMO${promotion.id}`,
      description: promotion.description,
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      discountPercentage: promotion.discountValue as any,
      imageUrl: ""
    })) as any
  };

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Promotion Management</h1>
            <p className="text-gray-600 mt-1">Create and manage promotional campaigns and discounts</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Total Promotions:</span>
            <span className="text-lg font-bold text-blue-600">{staticPromotions.length}</span>
          </div>
        </div>
        
        <PromotionStats />
        
        <PageTableView title="Promotional Campaigns" data={data} />
      </div>
    </PageWrapper>
  );
};

export default PromotionPage;
