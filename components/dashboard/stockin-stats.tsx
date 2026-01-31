"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  DollarSign,
  Truck,
  Clock,
  CheckCircle,
  BarChart3,
  Calendar,
  Filter,
  Warehouse,
  Tag
} from "lucide-react";
import { staticStockIns } from "@/data/static-data";

export function StockInStats() {
  const stats = {
    totalStockIns: staticStockIns.length,
    received: staticStockIns.filter(s => s.status === 'Received').length,
    pending: staticStockIns.filter(s => s.status === 'Pending').length,
    partiallyReceived: staticStockIns.filter(s => s.status === 'Partially Received').length,
    backordered: staticStockIns.filter(s => s.status === 'Backordered').length,
    cancelled: staticStockIns.filter(s => s.status === 'Cancelled').length,
    totalValue: staticStockIns.reduce((sum, s) => sum + parseFloat(s.totalPrice), 0),
    actualValue: staticStockIns.reduce((sum, s) => sum + parseFloat(s.actualTotalPrice), 0),
    totalQuantity: staticStockIns.reduce((sum, s) => sum + s.quantity, 0),
    receivedQuantity: staticStockIns.reduce((sum, s) => sum + s.receivedQuantity, 0),
    purchaseOrders: staticStockIns.filter(s => s.stockInType === 'Purchase Order').length,
    returns: staticStockIns.filter(s => s.stockInType === 'Return').length,
    transfers: staticStockIns.filter(s => s.stockInType === 'Transfer').length,
    adjustments: staticStockIns.filter(s => s.stockInType === 'Adjustment').length,
    initialStock: staticStockIns.filter(s => s.stockInType === 'Initial Stock').length,
    highPriority: staticStockIns.filter(s => s.priority === 'High').length,
    mediumPriority: staticStockIns.filter(s => s.priority === 'Medium').length,
    lowPriority: staticStockIns.filter(s => s.priority === 'Low').length,
    qualityChecked: staticStockIns.filter(s => s.qualityCheck).length,
    warehouses: [...new Set(staticStockIns.map(s => s.warehouse))].length,
    categories: [...new Set(staticStockIns.map(s => s.category))].length,
    avgLeadTime: staticStockIns.reduce((sum, s) => {
      const expectedDate = new Date(s.expectedDate);
      const actualDate = new Date(s.date);
      return sum + (expectedDate.getTime() - actualDate.getTime()) / (1000 * 60 * 60 * 24);
    }, 0) / staticStockIns.length,
    thisMonth: staticStockIns.filter(s => {
      const stockDate = new Date(s.date);
      const now = new Date();
      return stockDate.getMonth() === now.getMonth() && stockDate.getFullYear() === now.getFullYear();
    }).length,
    thisWeek: staticStockIns.filter(s => {
      const stockDate = new Date(s.date);
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return stockDate >= weekAgo;
    }).length,
    today: staticStockIns.filter(s => {
      const stockDate = new Date(s.date);
      const now = new Date();
      return stockDate.toDateString() === now.toDateString();
    }).length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Received': return 'text-green-600';
      case 'Pending': return 'text-yellow-600';
      case 'Partially Received': return 'text-orange-600';
      case 'Backordered': return 'text-red-600';
      case 'Cancelled': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'Received': return 'bg-green-50';
      case 'Pending': return 'bg-yellow-50';
      case 'Partially Received': return 'bg-orange-50';
      case 'Backordered': return 'bg-red-50';
      case 'Cancelled': return 'bg-red-50';
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
            <CardTitle className="text-sm font-medium text-gray-600">Total Stock Ins</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalStockIns}</div>
            <p className="text-xs text-gray-500">
              {stats.categories} categories
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Received</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.received}</div>
            <p className="text-xs text-gray-500">
              {((stats.received / stats.totalStockIns) * 100).toFixed(1)}% received
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-gray-500">
              Awaiting delivery
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Backordered</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.backordered}</div>
            <p className="text-xs text-gray-500">
              Need attention
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
              Total Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">${stats.totalValue.toFixed(2)}</div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <BarChart3 className="w-4 h-4 mr-2" />
              <span>Expected value</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Actual Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">${stats.actualValue.toFixed(2)}</div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <span className="text-blue-600">Received value</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Total Quantity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{stats.totalQuantity.toLocaleString()}</div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <span className="text-purple-600">Ordered quantity</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stock In Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Truck className="h-5 w-5 mr-2" />
              Purchase Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{stats.purchaseOrders}</div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <span className="text-blue-600">Regular orders</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Returns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{stats.returns}</div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <span className="text-orange-600">Customer returns</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Warehouse className="h-5 w-5 mr-2" />
              Transfers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{stats.transfers}</div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <span className="text-purple-600">Internal transfers</span>
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
              <span className="text-red-600">Urgent items</span>
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
              <span className="text-yellow-600">Standard items</span>
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
              <span className="text-blue-600">Regular items</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Stock Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Quality Checked</span>
              <div className="flex items-center">
                <div className={`w-32 bg-gray-200 rounded-full h-2 mr-2`}>
                  <div 
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${(stats.qualityChecked / stats.totalStockIns) * 100}%` }}
                  />
                </div>
                <span className={`text-sm font-medium ${getStatusColor('Received')}`}>
                  {((stats.qualityChecked / stats.totalStockIns) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Average Lead Time</span>
              <span className="text-sm font-medium text-orange-600">{stats.avgLeadTime.toFixed(1)} days</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Warehouses Used</span>
              <span className="text-sm font-medium text-blue-600">{stats.warehouses}</span>
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
                <div className="text-lg font-bold text-orange-600">{stats.partiallyReceived}</div>
                <div className="text-xs text-gray-600">Partial</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
