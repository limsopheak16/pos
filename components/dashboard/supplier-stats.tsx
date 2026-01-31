"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  TrendingUp, 
  Star, 
  Award,
  DollarSign,
  Package,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3
} from "lucide-react";
import { staticSuppliers } from "@/data/static-data";

export function SupplierStats() {
  const stats = {
    totalSuppliers: staticSuppliers.length,
    categories: [...new Set(staticSuppliers.map(s => s.category))].length,
    topRated: staticSuppliers.filter(s => s.rating === 'A+').length,
    averageRevenue: staticSuppliers.reduce((sum, s) => sum + s.annualRevenue, 0) / staticSuppliers.length,
    totalProducts: staticSuppliers.reduce((sum, s) => sum + s.products, 0),
    averageReliability: staticSuppliers.reduce((sum, s) => sum + s.reliability, 0) / staticSuppliers.length,
    certifiedSuppliers: staticSuppliers.filter(s => s.certifications.length > 0).length,
    totalOrders: staticSuppliers.reduce((sum, s) => sum + s.totalOrders, 0),
    totalSpent: staticSuppliers.reduce((sum, s) => sum + s.totalSpent, 0),
    averageLeadTime: staticSuppliers.reduce((sum, s) => sum + s.leadTime, 0) / staticSuppliers.length,
    averageYearsInBusiness: staticSuppliers.reduce((sum, s) => sum + s.yearsInBusiness, 0) / staticSuppliers.length,
    isoCertified: staticSuppliers.filter(s => s.certifications.includes('ISO 9001')).length,
    fdaApproved: staticSuppliers.filter(s => s.certifications.includes('FDA Approved')).length,
    organicCertified: staticSuppliers.filter(s => s.certifications.includes('Organic Certified')).length
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'A+': return 'text-green-600';
      case 'A': return 'text-blue-600';
      case 'A-': return 'text-purple-600';
      case 'B+': return 'text-yellow-600';
      case 'B': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getRatingBg = (rating: string) => {
    switch (rating) {
      case 'A+': return 'bg-green-50';
      case 'A': return 'bg-blue-50';
      case 'A-': return 'bg-purple-50';
      case 'B+': return 'bg-yellow-50';
      case 'B': return 'bg-orange-50';
      default: return 'bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Suppliers</CardTitle>
            <Building className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalSuppliers}</div>
            <p className="text-xs text-gray-500">
              {stats.categories} categories
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">A+ Rated</CardTitle>
            <Star className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.topRated}</div>
            <p className="text-xs text-gray-500">
              Top performers
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Certified</CardTitle>
            <Award className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.certifiedSuppliers}</div>
            <p className="text-xs text-gray-500">
              Quality assured
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Reliability</CardTitle>
            <CheckCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.averageReliability.toFixed(1)}%</div>
            <p className="text-xs text-gray-500">
              Performance score
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
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              ${(stats.averageRevenue / 1000000).toFixed(1)}M
            </div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <BarChart3 className="w-4 h-4 mr-2" />
              <span>Average per supplier</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{stats.totalProducts}</div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <span className="text-blue-600">Across all suppliers</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{stats.totalOrders}</div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <span className="text-purple-600">All time</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Avg Lead Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.averageLeadTime.toFixed(1)} days</div>
            <div className="text-xs text-gray-600 mt-2">
              Delivery time
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Avg Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.averageYearsInBusiness.toFixed(1)} years</div>
            <div className="text-xs text-gray-600 mt-2">
              In business
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              ISO Certified
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.isoCertified}</div>
            <div className="text-xs text-gray-600 mt-2">
              Quality standard
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              FDA Approved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.fdaApproved}</div>
            <div className="text-xs text-gray-600 mt-2">
              Food safety
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Supplier Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Supplier Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">{stats.totalSuppliers}</div>
                <div className="text-xs text-gray-600">Total Suppliers</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">{stats.topRated}</div>
                <div className="text-xs text-gray-600">A+ Rated</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-lg font-bold text-purple-600">{stats.certifiedSuppliers}</div>
                <div className="text-xs text-gray-600">Certified</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-lg font-bold text-orange-600">{stats.averageReliability.toFixed(0)}%</div>
                <div className="text-xs text-gray-600">Avg Reliability</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Spent with Suppliers</span>
                <span className="text-lg font-bold text-green-600">${stats.totalSpent.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Organic Certified Suppliers</span>
                <span className="text-lg font-bold text-green-600">{stats.organicCertified}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Average Lead Time</span>
                <span className="text-lg font-bold text-orange-600">{stats.averageLeadTime.toFixed(1)} days</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
