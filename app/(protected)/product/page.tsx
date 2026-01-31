import { PageTableView } from "./product-table";
import PageWrapper from "@/components/page-wrapper";
import { ProductStats } from "@/components/dashboard/product-stats";
import { staticProducts } from "@/data/static-data";

interface PageProps{
  searchParams: Promise<{[key: string]: string | undefined}>;
}

const ProductPage = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || "1");
  
  // Simulate pagination with static data
  const pageSize = 12;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = staticProducts.slice(startIndex, endIndex);

  const data = {
    pageSize,
    currentPage: page,
    prevPage: page > 1 ? page - 1 : 0,
    nextPage: endIndex < staticProducts.length ? page + 1 : 0,
    totalItems: staticProducts.length,
    totalPages: Math.ceil(staticProducts.length / pageSize),
    records: paginatedProducts.map(product => ({
      id: parseInt(product.id.replace('PRD', '')),
      productCode: product.id,
      nameKh: product.name,
      nameEn: product.name,
      category: product.category,
      sku: `PRD${product.id}`,
      ImageUrl: undefined
    }))
  };

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Inventory</h1>
            <p className="text-gray-600 mt-1">Manage your product catalog and inventory levels</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Total Products:</span>
            <span className="text-lg font-bold text-blue-600">{staticProducts.length}</span>
          </div>
        </div>
        
        <ProductStats />
        
        <PageTableView 
          title="Product Catalog" 
          data={data}
        />
      </div>
    </PageWrapper>
  );
};

export default ProductPage;

