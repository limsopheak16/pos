"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  DollarSign,
  ShoppingCart,
  BarChart3
} from "lucide-react";
import { staticProducts } from "@/data/static-data";

export function ProductStats() {
  const stats = {
    totalProducts: staticProducts.length,
    inStock: staticProducts.filter(p => p.status === 'In Stock').length,
    lowStock: staticProducts.filter(p => p.status === 'Low Stock').length,
    outOfStock: staticProducts.filter(p => p.status === 'Out of Stock').length,
    totalValue: staticProducts.reduce((sum, p) => sum + parseFloat(p.price.replace('$', '')), 0),
    avgPrice: staticProducts.reduce((sum, p) => sum + parseFloat(p.price.replace('$', '')), 0) / staticProducts.length,
    categories: [...new Set(staticProducts.map(p => p.category))].length,
    highValueProducts: staticProducts.filter(p => parseFloat(p.price.replace('$', '')) > 25).length,
    lowValueProducts: staticProducts.filter(p => parseFloat(p.price.replace('$', '')) < 10).length
  };

  const stockHealth = stats.totalProducts > 0 ? (stats.inStock / stats.totalProducts) * 100 : 0;
  const stockStatus = stockHealth > 80 ? 'excellent' : stockHealth > 60 ? 'good' : stockHealth > 40 ? 'warning' : 'critical';

  const getStockColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStockBg = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-50';
      case 'good': return 'bg-blue-50';
      case 'warning': return 'bg-yellow-50';
      case 'critical': return 'bg-red-50';
      default: return 'bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Products</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalProducts.toLocaleString()}</div>
            <p className="text-xs text-gray-500">
              {stats.categories} categories
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">In Stock</CardTitle>
            <ShoppingCart className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.inStock}</div>
            <p className="text-xs text-gray-500">
              {stockHealth.toFixed(1)}% health
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.lowStock}</div>
            <p className="text-xs text-gray-500">
              Needs attention
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Out of Stock</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.outOfStock}</div>
            <p className="text-xs text-gray-500">
              Critical level
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Total Inventory Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">${stats.totalValue.toFixed(2)}</div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <BarChart3 className="w-4 h-4 mr-2" />
              <span>Average price: ${stats.avgPrice.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              High Value Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{stats.highValueProducts}</div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <span className="text-purple-600">Over $25</span>
              <span className="ml-2">Premium items</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Low Value Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{stats.lowValueProducts}</div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <span className="text-orange-600">Under $10</span>
              <span className="ml-2">Budget items</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stock Health Indicator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Inventory Health Status
            </span>
            <Badge className={`${getStockBg(stockStatus)} ${getStockColor(stockStatus)}`}>
              {stockStatus.charAt(0).toUpperCase() + stockStatus.slice(1)}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Stock Health</span>
              <div className="flex items-center">
                <div className={`w-32 bg-gray-200 rounded-full h-2 mr-2`}>
                  <div 
                    className={`h-2 rounded-full ${getStockBg(stockStatus)}`}
                    style={{ width: `${stockHealth}%` }}
                  />
                </div>
                <span className={`text-sm font-medium ${getStockColor(stockStatus)}`}>
                  {stockHealth.toFixed(1)}%
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">{stats.inStock}</div>
                <div className="text-xs text-gray-600">In Stock</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-lg font-bold text-yellow-600">{stats.lowStock}</div>
                <div className="text-xs text-gray-600">Low Stock</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-lg font-bold text-red-600">{stats.outOfStock}</div>
                <div className="text-xs text-gray-600">Out of Stock</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">{stats.totalProducts}</div>
                <div className="text-xs text-gray-600">Total</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
