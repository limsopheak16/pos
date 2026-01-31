"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, ShoppingCart, Package } from "lucide-react";

export function LiveStats() {
  const [stats, setStats] = useState({
    liveUsers: 127,
    activeOrders: 43,
    todaySales: 8459.32,
    conversionRate: 3.2
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        liveUsers: prev.liveUsers + Math.floor(Math.random() * 5) - 2,
        activeOrders: prev.activeOrders + Math.floor(Math.random() * 3) - 1,
        todaySales: prev.todaySales + (Math.random() * 100 - 30),
        conversionRate: Math.max(0, Math.min(10, prev.conversionRate + (Math.random() * 0.4 - 0.2)))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Live Users</CardTitle>
          <Users className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{stats.liveUsers}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">↑ 12%</span> from last hour
          </p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
          <ShoppingCart className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{stats.activeOrders}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">↑ 8%</span> from yesterday
          </p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-purple-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
          <TrendingUp className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">${stats.todaySales.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">↑ 23%</span> from yesterday
          </p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-orange-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          <Package className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">{stats.conversionRate.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">↑ 0.3%</span> from last week
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
