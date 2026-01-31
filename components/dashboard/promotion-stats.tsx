"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Tag, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  DollarSign,
  Target,
  Clock,
  CheckCircle,
  BarChart3,
  Calendar,
  Users,
  ShoppingCart,
  Zap,
  Award
} from "lucide-react";
import { staticPromotions } from "@/data/static-data";

export function PromotionStats() {
  const stats = {
    totalPromotions: staticPromotions.length,
    active: staticPromotions.filter(p => p.status === 'Active').length,
    scheduled: staticPromotions.filter(p => p.status === 'Scheduled').length,
    expired: staticPromotions.filter(p => p.status === 'Expired').length,
    paused: staticPromotions.filter(p => p.status === 'Paused').length,
    highPriority: staticPromotions.filter(p => p.priority === 'High').length,
    mediumPriority: staticPromotions.filter(p => p.priority === 'Medium').length,
    lowPriority: staticPromotions.filter(p => p.priority === 'Low').length,
    totalViews: staticPromotions.reduce((sum, p) => sum + p.performance.views, 0),
    totalClicks: staticPromotions.reduce((sum, p) => sum + p.performance.clicks, 0),
    totalConversions: staticPromotions.reduce((sum, p) => sum + p.performance.conversions, 0),
    totalRevenue: staticPromotions.reduce((sum, p) => sum + p.performance.revenue, 0),
    percentageDiscounts: staticPromotions.filter(p => p.type === 'Percentage Discount').length,
    bogo: staticPromotions.filter(p => p.type === 'Buy One Get One').length,
    fixedAmount: staticPromotions.filter(p => p.type === 'Fixed Amount Off').length,
    freeShipping: staticPromotions.filter(p => p.type === 'Free Shipping').length,
    bundleDeals: staticPromotions.filter(p => p.type === 'Bundle Deal').length,
    flashSales: staticPromotions.filter(p => p.type === 'Flash Sale').length,
    seasonalSales: staticPromotions.filter(p => p.type === 'Seasonal Sale').length,
    clearance: staticPromotions.filter(p => p.type === 'Clearance').length,
    online: staticPromotions.filter(p => p.channel === 'Online').length,
    inStore: staticPromotions.filter(p => p.channel === 'In-Store').length,
    mobileApp: staticPromotions.filter(p => p.channel === 'Mobile App').length,
    allChannels: staticPromotions.filter(p => p.channel === 'All Channels').length,
    thisMonth: staticPromotions.filter(p => {
      const startDate = new Date(p.startDate);
      const now = new Date();
      return startDate.getMonth() === now.getMonth() && startDate.getFullYear() === now.getFullYear();
    }).length,
    thisWeek: staticPromotions.filter(p => {
      const startDate = new Date(p.startDate);
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return startDate >= weekAgo;
    }).length,
    today: staticPromotions.filter(p => {
      const startDate = new Date(p.startDate);
      const now = new Date();
      return startDate.toDateString() === now.toDateString();
    }).length,
    avgConversionRate: staticPromotions.reduce((sum, p) => sum + (p.performance.clicks > 0 ? (p.performance.conversions / p.performance.clicks) * 100 : 0), 0) / staticPromotions.length,
    avgRevenuePerPromotion: staticPromotions.reduce((sum, p) => sum + p.performance.revenue, 0) / staticPromotions.length,
    totalUsageLimit: staticPromotions.reduce((sum, p) => sum + p.usageLimit, 0),
    totalUsageCount: staticPromotions.reduce((sum, p) => sum + p.usageCount, 0),
    remainingUsage: staticPromotions.reduce((sum, p) => sum + p.remainingUsage, 0)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-600';
      case 'Scheduled': return 'text-blue-600';
      case 'Expired': return 'text-red-600';
      case 'Paused': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-50';
      case 'Scheduled': return 'bg-blue-50';
      case 'Expired': return 'bg-red-50';
      case 'Paused': return 'bg-yellow-50';
      default: return 'bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityBg = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-50';
      case 'Medium': return 'bg-yellow-50';
      case 'Low': return 'bg-blue-50';
      default: return 'bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Promotions</CardTitle>
            <Tag className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalPromotions}</div>
            <p className="text-xs text-gray-500">
              {stats.active} currently active
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Campaigns</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <p className="text-xs text-gray-500">
              {((stats.active / stats.totalPromotions) * 100).toFixed(1)}% active rate
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">${(stats.totalRevenue / 1000).toFixed(1)}K</div>
            <p className="text-xs text-gray-500">
              From all promotions
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.avgConversionRate.toFixed(1)}%</div>
            <p className="text-xs text-gray-500">
              Average performance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Total Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{stats.totalViews.toLocaleString()}</div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <BarChart3 className="w-4 h-4 mr-2" />
              <span>Campaign visibility</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Total Conversions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.totalConversions.toLocaleString()}</div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <span className="text-green-600">Successful conversions</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Total Clicks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{stats.totalClicks.toLocaleString()}</div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <span className="text-purple-600">Engagement rate</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Promotion Types */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Tag className="h-5 w-5 mr-2" />
              Percentage Discounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{stats.percentageDiscounts}</div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <span className="text-blue-600">% based offers</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              BOGO Deals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.bogo}</div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <span className="text-green-600">Buy one get one</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Flash Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{stats.flashSales}</div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <span className="text-orange-600">Limited time</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Bundle Deals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{stats.bundleDeals}</div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <span className="text-purple-600">Multi-item offers</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Priority Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              High Priority
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{stats.highPriority}</div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <span className="text-red-600">Critical campaigns</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Medium Priority
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{stats.mediumPriority}</div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <span className="text-yellow-600">Standard campaigns</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Low Priority
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{stats.lowPriority}</div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <span className="text-blue-600">Regular campaigns</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Promotion Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Usage Utilization</span>
              <div className="flex items-center">
                <div className={`w-32 bg-gray-200 rounded-full h-2 mr-2`}>
                  <div 
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${(stats.totalUsageCount / stats.totalUsageLimit) * 100}%` }}
                  />
                </div>
                <span className={`text-sm font-medium ${getStatusColor('Active')}`}>
                  {((stats.totalUsageCount / stats.totalUsageLimit) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Average Revenue per Promotion</span>
              <span className="text-sm font-medium text-purple-600">${stats.avgRevenuePerPromotion.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Remaining Usage</span>
              <span className="text-sm font-medium text-blue-600">{stats.remainingUsage.toLocaleString()}</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">{stats.today}</div>
                <div className="text-xs text-gray-600">Today</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">{stats.thisWeek}</div>
                <div className="text-xs text-gray-600">This Week</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-lg font-bold text-purple-600">{stats.thisMonth}</div>
                <div className="text-xs text-gray-600">This Month</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-lg font-bold text-orange-600">{stats.scheduled}</div>
                <div className="text-xs text-gray-600">Scheduled</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
