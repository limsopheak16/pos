"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Users, 
  Package, 
  Store, 
  ArrowRight,
  Star,
  DollarSign,
  Target,
  Truck,
  Tag,
  BarChart3
} from "lucide-react";
import { staticProducts } from "@/data/static-data";
import { staticCustomers } from "@/data/static-data";
import { staticSuppliers } from "@/data/static-data";
import { staticStockIns } from "@/data/static-data";
import { staticPromotions } from "@/data/static-data";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate real business metrics from static data
  const businessMetrics = {
    totalRevenue: staticProducts.reduce((sum, p) => sum + parseFloat(p.price.replace('$', '')) * 100, 0),
    totalProducts: staticProducts.length,
    totalCustomers: staticCustomers.length,
    totalSuppliers: staticSuppliers.length,
    totalStockIns: staticStockIns.length,
    activePromotions: staticPromotions.filter(p => p.status === 'Active').length,
    receivedStock: staticStockIns.filter(s => s.status === 'Received').length,
    promotionRevenue: staticPromotions.reduce((sum, p) => sum + p.performance.revenue, 0)
  };

  const quickStats = [
    { 
      label: "Total Revenue", 
      value: `$${(businessMetrics.totalRevenue / 1000).toFixed(1)}K`, 
      icon: <DollarSign className="h-5 w-5" />,
      change: "+12.5%"
    },
    { 
      label: "Active Products", 
      value: businessMetrics.totalProducts, 
      icon: <Package className="h-5 w-5" />,
      change: "+8"
    },
    { 
      label: "Total Customers", 
      value: businessMetrics.totalCustomers, 
      icon: <Users className="h-5 w-5" />,
      change: "+156"
    },
    { 
      label: "Active Promotions", 
      value: businessMetrics.activePromotions, 
      icon: <Tag className="h-5 w-5" />,
      change: "+3"
    }
  ];

  const businessInsights = [
    {
      title: "Inventory Status",
      value: `${businessMetrics.receivedStock}/${businessMetrics.totalStockIns}`,
      description: "Stock received today",
      icon: <Truck className="h-8 w-8" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Supplier Network",
      value: businessMetrics.totalSuppliers,
      description: "Active suppliers",
      icon: <Store className="h-8 w-8" />,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Promotion Performance",
      value: `$${(businessMetrics.promotionRevenue / 1000).toFixed(1)}K`,
      description: "Revenue from promotions",
      icon: <Target className="h-8 w-8" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Business Growth",
      value: "+24.5%",
      description: "Monthly growth rate",
      icon: <BarChart3 className="h-8 w-8" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const featuredProducts = staticProducts.slice(0, 8).map(product => ({
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price,
    originalPrice: `$${(parseFloat(product.price.replace('$', '')) * 1.2).toFixed(2)}`,
    image: product.name.toLowerCase().includes('apple') ? '🍎' :
           product.name.toLowerCase().includes('coffee') ? '☕' :
           product.name.toLowerCase().includes('milk') ? '🥛' :
           product.name.toLowerCase().includes('bread') ? '🍞' :
           product.name.toLowerCase().includes('eggs') ? '🥚' :
           product.name.toLowerCase().includes('juice') ? '🧃' :
           product.name.toLowerCase().includes('tomatoes') ? '🍅' :
           product.name.toLowerCase().includes('yogurt') ? '🥛' :
           product.category === 'Fruits' ? '🍎' :
           product.category === 'Beverages' ? '🧃' :
           product.category === 'Dairy' ? '🥛' :
           product.category === 'Bakery' ? '🍞' :
           product.category === 'Vegetables' ? '🥬' :
           product.category === 'Meat' ? '🥩' :
           product.category === 'Seafood' ? '🦐' :
           product.category === 'Pantry' ? '🥫' :
           product.category === 'Frozen' ? '🧊' :
           product.category === 'Snacks' ? '🍿' :
           '📦',
    badge: product.category === 'Fruits' ? 'Fresh' : 'Premium',
    badgeColor: product.category === 'Fruits' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800',
    rating: (Math.random() * 1 + 4).toFixed(1),
    reviews: Math.floor(Math.random() * 500) + 100
  }));

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Store className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Ariya Business</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
              📊 Business Intelligence Dashboard - Real-time Analytics
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Complete Business
              <span className="text-blue-600"> Management System</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Manage your entire business operations from inventory and sales to customer relationships and supplier management - all in one powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                  View Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/product">
                <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {quickStats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-2 text-blue-600">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                  <div className="text-xs mt-1 text-green-600">{stat.change}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Business Insights Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Business Intelligence Overview
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real-time insights from your business operations across all departments
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessInsights.map((insight, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className={`inline-flex p-3 rounded-lg ${insight.bgColor} mb-4`}>
                    <div className={insight.color}>
                      {insight.icon}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{insight.value}</div>
                  <div className="text-sm font-medium text-gray-900 mt-1">{insight.title}</div>
                  <div className="text-xs text-gray-600 mt-2">{insight.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Top Performing Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Best-selling products from your inventory management system
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 group cursor-pointer border-0 shadow-md">
                <CardHeader className="pb-3">
                  <div className="relative">
                    <div className="text-7xl text-center mb-3">{product.image}</div>
                    <Badge className={`absolute top-0 right-0 text-xs font-semibold ${product.badgeColor}`}>
                      {product.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </CardTitle>
                  <p className="text-sm text-gray-500 font-medium">{product.category}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                      <span className="text-sm text-gray-400 line-through ml-2">{product.originalPrice}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold">{product.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-sm font-semibold">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Manage
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Optimize Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Access your complete business dashboard and take control of your operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/product">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600">
                Manage Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Store className="h-6 w-6" />
                <span className="text-lg font-bold">Ariya Business</span>
              </div>
              <p className="text-gray-400">
                Complete business management system for inventory, sales, customers, and suppliers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Modules</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
                <li><Link href="/product" className="hover:text-white">Products</Link></li>
                <li><Link href="/customer" className="hover:text-white">Customers</Link></li>
                <li><Link href="/supplier" className="hover:text-white">Suppliers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Operations</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/stockin" className="hover:text-white">Stock Management</Link></li>
                <li><Link href="/promotion" className="hover:text-white">Promotions</Link></li>
                <li><Link href="/pos" className="hover:text-white">Point of Sale</Link></li>
                <li><Link href="/user" className="hover:text-white">User Management</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Analytics</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Real-time Metrics</li>
                <li>Business Intelligence</li>
                <li>Performance Reports</li>
                <li>Revenue Analytics</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Ariya Business Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
