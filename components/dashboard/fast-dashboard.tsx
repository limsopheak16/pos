"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Package, 
  DollarSign, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Target,
  Award,
  BarChart3,
  PieChart,
  Timer
} from "lucide-react";

// Memoized metric card component
const MetricCard = React.memo(({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color, 
  bgColor 
}: {
  title: string;
  value: string | number;
  change: number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}) => (
  <Card className={`${bgColor} border-0 shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105`}>
    <CardContent className="p-4">
      <div className="flex items-center justify-between mb-2">
        <Icon className={`w-5 h-5 ${color}`} />
        <div className={`flex items-center text-xs font-medium ${
          change > 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {change > 0 ? (
            <ArrowUpRight className="w-3 h-3 mr-1" />
          ) : (
            <ArrowDownRight className="w-3 h-3 mr-1" />
          )}
          {Math.abs(change)}%
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-600 mt-1">{title}</div>
    </CardContent>
  </Card>
));

MetricCard.displayName = 'MetricCard';

export function FastDashboard() {
  const [metrics, setMetrics] = useState({
    revenue: 125780.50,
    orders: 1847,
    customers: 3421,
    products: 128,
    conversionRate: 3.2,
    avgOrderValue: 68.15,
    pageViews: 15420,
    bounceRate: 32.5
  });

  const [liveActivity, setLiveActivity] = useState([
    { id: 1, type: "order", message: "New order #1234 - $127.50", time: "Just now", priority: "high" },
    { id: 2, type: "customer", message: "New customer registered", time: "2 min ago", priority: "medium" },
    { id: 3, type: "sale", message: "Product #45 sold out", time: "5 min ago", priority: "low" },
    { id: 4, type: "review", message: "5-star review received", time: "8 min ago", priority: "medium" }
  ]);

  // Optimized live updates with useCallback
  const updateMetrics = useCallback(() => {
    setMetrics(prev => ({
      revenue: prev.revenue + (Math.random() * 200 - 50),
      orders: prev.orders + Math.floor(Math.random() * 3),
      customers: prev.customers + Math.floor(Math.random() * 2),
      products: prev.products,
      conversionRate: Math.max(0, Math.min(10, prev.conversionRate + (Math.random() * 0.2 - 0.1))),
      avgOrderValue: Math.max(20, prev.avgOrderValue + (Math.random() * 5 - 2.5)),
      pageViews: prev.pageViews + Math.floor(Math.random() * 50),
      bounceRate: Math.max(0, Math.min(100, prev.bounceRate + (Math.random() * 2 - 1)))
    }));
  }, []);

  // Optimized activity update
  const updateActivity = useCallback(() => {
    const activities = [
      { id: Date.now(), type: "order", message: `New order #${Math.floor(Math.random() * 9999)} - $${(Math.random() * 200 + 20).toFixed(2)}`, time: "Just now", priority: "high" },
      { id: Date.now() + 1, type: "customer", message: "New customer registered", time: "Just now", priority: "medium" },
      { id: Date.now() + 2, type: "sale", message: "Flash sale started!", time: "Just now", priority: "high" },
      { id: Date.now() + 3, type: "review", message: `${Math.floor(Math.random() * 5 + 1)}-star review received`, time: "Just now", priority: "medium" }
    ];
    
    setLiveActivity(prev => [activities[Math.floor(Math.random() * activities.length)], ...prev.slice(0, 3)]);
  }, []);

  // Optimized effect with proper cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      updateMetrics();
      updateActivity();
    }, 3000);

    return () => clearInterval(interval);
  }, [updateMetrics, updateActivity]);

  // Memoized metric cards
  const metricCards = useMemo(() => [
    {
      title: "Total Revenue",
      value: `$${metrics.revenue.toFixed(2)}`,
      change: 12.5,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Total Orders",
      value: metrics.orders.toLocaleString(),
      change: 8.3,
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Active Customers",
      value: metrics.customers.toLocaleString(),
      change: 15.7,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Products",
      value: metrics.products,
      change: 2.1,
      icon: Package,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Conversion Rate",
      value: `${metrics.conversionRate.toFixed(1)}%`,
      change: 0.8,
      icon: Target,
      color: "text-pink-600",
      bgColor: "bg-pink-50"
    },
    {
      title: "Avg Order Value",
      value: `$${metrics.avgOrderValue.toFixed(2)}`,
      change: 5.2,
      icon: TrendingUp,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      title: "Page Views",
      value: metrics.pageViews.toLocaleString(),
      change: 18.4,
      icon: BarChart3,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50"
    },
    {
      title: "Bounce Rate",
      value: `${metrics.bounceRate.toFixed(1)}%`,
      change: -3.2,
      icon: PieChart,
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ], [metrics]);

  // Memoized activity items
  const activityItems = useMemo(() => liveActivity.map((activity) => (
    <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex items-center">
        <div className={`w-2 h-2 rounded-full mr-3 ${
          activity.type === 'order' ? 'bg-blue-500' :
          activity.type === 'customer' ? 'bg-green-500' :
          activity.type === 'sale' ? 'bg-orange-500' : 'bg-purple-500'
        }`} />
        <span className="text-sm font-medium">{activity.message}</span>
        {activity.priority === 'high' && (
          <Badge className="ml-2 bg-red-100 text-red-800 text-xs">High</Badge>
        )}
      </div>
      <span className="text-xs text-gray-500">{activity.time}</span>
    </div>
  )), [liveActivity]);

  return (
    <div className="space-y-6">
      {/* Header with Performance Badges */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ariya Mart Dashboard</h1>
          <p className="text-gray-600 mt-1">Real-time business metrics and insights</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-green-100 text-green-800 px-3 py-1 animate-pulse">
            <Zap className="w-4 h-4 mr-1" />
            Live
          </Badge>
          <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
            <Activity className="w-4 h-4 mr-1" />
            High Performance
          </Badge>
          <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
            <Timer className="w-4 h-4 mr-1" />
            Optimized
          </Badge>
        </div>
      </div>

      {/* Main Metrics Grid - Optimized */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {metricCards.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Live Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Live Activity Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activityItems}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <ShoppingCart className="w-4 h-4 mr-2" />
              View Orders
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Manage Customers
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Package className="w-4 h-4 mr-2" />
              Update Products
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Award className="w-4 h-4 mr-2" />
              View Reports
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <div className="text-3xl font-bold text-green-600">98.2%</div>
              <div className="text-sm text-gray-600 mt-1">Uptime</div>
              <div className="text-xs text-green-600 mt-2">Excellent</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">1.2s</div>
              <div className="text-sm text-gray-600 mt-1">Avg Response</div>
              <div className="text-xs text-blue-600 mt-2">Very Fast</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">4.8</div>
              <div className="text-sm text-gray-600 mt-1">Customer Rating</div>
              <div className="text-xs text-purple-600 mt-2">Outstanding</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
              <div className="text-3xl font-bold text-orange-600">24/7</div>
              <div className="text-sm text-gray-600 mt-1">Support</div>
              <div className="text-xs text-orange-600 mt-2">Always Available</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
