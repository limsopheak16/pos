"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SalesData {
  date: string;
  sales: number;
  orders: number;
}

export default function SalesChart() {
  const [data, setData] = useState<SalesData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for demo - in real app, this would come from API
    const mockData: SalesData[] = [
      { date: "Jan 1", sales: 2400, orders: 45 },
      { date: "Jan 2", sales: 1398, orders: 28 },
      { date: "Jan 3", sales: 9800, orders: 156 },
      { date: "Jan 4", sales: 3908, orders: 67 },
      { date: "Jan 5", sales: 4800, orders: 89 },
      { date: "Jan 6", sales: 3800, orders: 72 },
      { date: "Jan 7", sales: 4300, orders: 81 },
    ];

    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] animate-pulse bg-gray-100 rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [
                name === "sales" ? `$${value}` : value,
                name === "sales" ? "Sales" : "Orders"
              ]}
            />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#2563eb" 
              strokeWidth={2}
              dot={{ fill: "#2563eb" }}
            />
            <Line 
              type="monotone" 
              dataKey="orders" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ fill: "#10b981" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
