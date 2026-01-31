"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ShoppingCart, Package, DollarSign, TrendingUp, TrendingDown } from "lucide-react";

interface AnalyticsData {
  totalUsers: number;
  totalProducts: number;
  totalCustomers: number;
  totalSales: number;
  salesGrowth: number;
  userGrowth: number;
}

export default function AnalyticsCards() {
  const [data, setData] = useState<AnalyticsData>({
    totalUsers: 0,
    totalProducts: 0,
    totalCustomers: 0,
    totalSales: 0,
    salesGrowth: 0,
    userGrowth: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      // Fetch static analytics data
      const response = await fetch("/api/static-analytics");
      const analyticsData = await response.json();

      setData({
        totalUsers: analyticsData.data?.totalUsers || 0,
        totalProducts: analyticsData.data?.totalProducts || 0,
        totalCustomers: analyticsData.data?.totalCustomers || 0,
        totalSales: analyticsData.data?.totalSales || 0,
        salesGrowth: analyticsData.data?.salesGrowth || 0,
        userGrowth: analyticsData.data?.userGrowth || 0,
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Total Users",
      value: data.totalUsers,
      icon: Users,
      change: data.userGrowth,
      changeType: "increase" as const,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Products",
      value: data.totalProducts,
      icon: Package,
      change: null,
      changeType: "neutral" as const,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Customers",
      value: data.totalCustomers,
      icon: Users,
      change: null,
      changeType: "neutral" as const,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Total Sales",
      value: `$${data.totalSales.toFixed(2)}`,
      icon: DollarSign,
      change: data.salesGrowth,
      changeType: "increase" as const,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <div className={`p-2 rounded-md ${card.bgColor}`}>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              {card.change !== null && (
                <div className="flex items-center text-xs text-muted-foreground">
                  {card.changeType === "increase" ? (
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                  )}
                  <span className={card.changeType === "increase" ? "text-green-500" : "text-red-500"}>
                    {card.change}%
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
