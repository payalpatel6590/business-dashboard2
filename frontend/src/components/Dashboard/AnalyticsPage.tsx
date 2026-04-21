import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from "@heroicons/react/24/outline";

interface MetricCard {
  title: string;
  value: string;
  change: number;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
}

interface ChartData {
  name: string;
  value: number;
  change: number;
}

const AnalyticsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [metrics, setMetrics] = useState<MetricCard[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const periods = [
    { value: "24h", label: "Last 24 hours" },
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "90d", label: "Last 90 days" }
  ];

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const mockMetrics: MetricCard[] = [
        {
          title: "Total Revenue",
          value: "$124,563",
          change: 12.5,
          icon: CurrencyDollarIcon,
          color: "text-green-600",
          bgColor: "bg-green-100"
        },
        {
          title: "Active Users",
          value: "8,549",
          change: 8.2,
          icon: UserGroupIcon,
          color: "text-blue-600",
          bgColor: "bg-blue-100"
        },
        {
          title: "Conversion Rate",
          value: "3.24%",
          change: -2.1,
          icon: ArrowTrendingUpIcon,
          color: "text-purple-600",
          bgColor: "bg-purple-100"
        },
        {
          title: "Avg. Session",
          value: "5m 42s",
          change: 15.3,
          icon: ClockIcon,
          color: "text-orange-600",
          bgColor: "bg-orange-100"
        }
      ];

      const mockChartData: ChartData[] = [
        { name: "Mon", value: 4000, change: 5 },
        { name: "Tue", value: 3000, change: -8 },
        { name: "Wed", value: 5000, change: 12 },
        { name: "Thu", value: 4500, change: 3 },
        { name: "Fri", value: 6000, change: 18 },
        { name: "Sat", value: 5500, change: -5 },
        { name: "Sun", value: 7000, change: 25 }
      ];

      setMetrics(mockMetrics);
      setChartData(mockChartData);
      setIsLoading(false);
    };

    loadData();
  }, [selectedPeriod]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your business performance and insights
          </p>
        </div>

        {/* Period Selector */}
        <div className="mt-4 sm:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {periods.map((period) => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
              
              <div className={`flex items-center space-x-1 ${
                metric.change >= 0 ? "text-green-600" : "text-red-600"
              }`}>
                {metric.change >= 0 ? (
                  <ArrowTrendingUpIcon className="h-4 w-4" />
                ) : (
                  <ArrowTrendingDownIcon className="h-4 w-4" />
                )}
                <span className="text-sm font-medium">
                  {Math.abs(metric.change)}%
                </span>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {metric.value}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {metric.title}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Revenue Overview
          </h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View Details
          </button>
        </div>

        {/* Simple Bar Chart */}
        <div className="space-y-4">
          {chartData.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center space-x-4"
            >
              <div className="w-12 text-sm text-gray-600 dark:text-gray-400">
                {item.name}
              </div>
              
              <div className="flex-1">
                <div className="relative">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.value / 7000) * 100}%` }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className={`h-full ${
                        item.change >= 0 ? "bg-blue-500" : "bg-gray-400"
                      } rounded-lg`}
                    />
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-between px-3">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      ${item.value.toLocaleString()}
                    </span>
                    <span className={`text-xs ${
                      item.change >= 0 ? "text-green-600" : "text-red-600"
                    }`}>
                      {item.change >= 0 ? "+" : ""}{item.change}%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Recent Activity
        </h2>

        <div className="space-y-4">
          {[
            {
              user: "John Doe",
              action: "completed a purchase",
              time: "2 minutes ago",
              color: "bg-green-100 text-green-800"
            },
            {
              user: "Jane Smith",
              action: "signed up for premium",
              time: "15 minutes ago",
              color: "bg-blue-100 text-blue-800"
            },
            {
              user: "Mike Johnson",
              action: "updated payment method",
              time: "1 hour ago",
              color: "bg-purple-100 text-purple-800"
            },
            {
              user: "Sarah Williams",
              action: "cancelled subscription",
              time: "2 hours ago",
              color: "bg-red-100 text-red-800"
            }
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <UserGroupIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </div>
              
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">
                  <span className="font-medium">{activity.user}</span>{" "}
                  {activity.action}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.time}
                </p>
              </div>
              
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${activity.color}`}>
                {activity.action.includes("purchase") ? "Revenue" : 
                 activity.action.includes("signed") ? "New User" :
                 activity.action.includes("updated") ? "Update" : "Churn"}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsPage;
