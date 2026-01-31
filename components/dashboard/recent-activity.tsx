"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

interface Activity {
  id: string;
  type: "sale" | "user" | "product" | "customer";
  title: string;
  description: string;
  timestamp: Date;
  user: string;
}

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for demo - in real app, this would come from API
    const mockActivities: Activity[] = [
      {
        id: "1",
        type: "sale",
        title: "New Sale Completed",
        description: "Order #12345 - $125.50",
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        user: "Admin User",
      },
      {
        id: "2",
        type: "user",
        title: "New User Registered",
        description: "John Doe joined the team",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        user: "Admin User",
      },
      {
        id: "3",
        type: "product",
        title: "Product Added",
        description: "New product 'Pizza' added to inventory",
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        user: "Admin User",
      },
      {
        id: "4",
        type: "customer",
        title: "New Customer",
        description: "John Doe became a new customer",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        user: "Admin User",
      },
      {
        id: "5",
        type: "sale",
        title: "Sale Completed",
        description: "Order #12344 - $89.25",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
        user: "Admin User",
      },
    ];

    setTimeout(() => {
      setActivities(mockActivities);
      setLoading(false);
    }, 1000);
  }, []);

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "sale":
        return "💰";
      case "user":
        return "👤";
      case "product":
        return "📦";
      case "customer":
        return "🤝";
      default:
        return "📝";
    }
  };

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3 animate-pulse">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {activity.description}
                  </p>
                  <div className="flex items-center mt-1 space-x-2">
                    <Avatar className="w-4 h-4">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-xs">A</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-gray-400">{activity.user}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-400">
                      {formatRelativeTime(activity.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
