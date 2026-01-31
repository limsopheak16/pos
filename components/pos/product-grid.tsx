"use client";

import { useState, useMemo, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import { staticProducts } from "@/data/static-data";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: string;
}

interface ProductCategory {
  id: string;
  name: string;
}

interface ProductGridProps {
  onProductSelect: (product: Product) => void;
  loading?: boolean;
}

export function ProductGrid({ 
  onProductSelect, 
  loading = false 
}: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Convert static products to POS format
    const posProducts = staticProducts.map(product => ({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      status: product.status
    }));
    setProducts(posProducts);
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    return uniqueCategories.map((cat, index) => ({
      id: String(index + 1),
      name: cat
    }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === "all" || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const getProductPrice = (product: Product) => {
    return parseFloat(product.price.replace('$', ''));
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-48 h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="p-4">
                <div className="w-full h-32 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Product Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </p>
        <Badge variant="secondary">
          {selectedCategory === "all" 
            ? "All Categories" 
            : categories.find(c => c.id === selectedCategory)?.name}
        </Badge>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="p-4 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 group"
            onClick={() => onProductSelect(product)}
          >
            <div className="relative">
              <div className="w-full h-32 bg-gray-100 rounded-md mb-2 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <span className="text-4xl">🛍️</span>
              </div>
              <Badge 
                variant="secondary" 
                className="absolute top-2 right-2 text-xs"
              >
                {product.status}
              </Badge>
            </div>
            <div className="space-y-1">
              <h3 className="font-medium text-sm group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-green-600">
                  {product.price}
                </p>
                <Badge variant="outline" className="text-xs">
                  {product.category}
                </Badge>
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-500">
                  Stock: {product.stock}
                </p>
                <div className={`w-2 h-2 rounded-full ${
                  product.status === 'In Stock' ? 'bg-green-500' : 
                  product.status === 'Low Stock' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
