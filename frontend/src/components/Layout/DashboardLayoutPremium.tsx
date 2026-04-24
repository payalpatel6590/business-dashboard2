import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { io } from "socket.io-client";
import { useAuth } from "../../contexts/AuthContext";
import AdvancedThemeToggle from "../Common/AdvancedThemeToggle";
import {
  CurrencyDollarIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  UserIcon,
  BriefcaseIcon,
  ClockIcon,
  ChartBarIcon,
  SparklesIcon,
  CpuChipIcon
} from "@heroicons/react/24/outline";

// Use deployed backend URL for all environments
const socket = io("https://business-dashboard2.onrender.com", {
  withCredentials: true,
});

interface Notification {
  id: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: Date;
  read: boolean;
}

const DashboardLayoutPremium: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: HomeIcon,
      current: location.pathname === "/dashboard",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "AI Analytics",
      href: "/dashboard/ai-analytics",
      icon: CpuChipIcon,
      current: location.pathname === "/dashboard/ai-analytics",
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: ChartBarIcon,
      current: location.pathname === "/dashboard/analytics",
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "Sales",
      href: "/dashboard/sales",
      icon: CurrencyDollarIcon,
      current: location.pathname === "/dashboard/sales",
      color: "from-green-500 to-green-600"
    },
    {
      name: "Revenue",
      href: "/dashboard/revenue",
      icon: ArrowTrendingUpIcon,
      current: location.pathname === "/dashboard/revenue",
      color: "from-orange-500 to-orange-600"
    },
    {
      name: "History",
      href: "/dashboard/history",
      icon: ClockIcon,
      current: location.pathname === "/dashboard/history",
      color: "from-gray-500 to-gray-600"
    },
    {
      name: "Portfolio",
      href: "/dashboard/portfolio",
      icon: BriefcaseIcon,
      current: location.pathname === "/dashboard/portfolio",
      color: "from-indigo-500 to-indigo-600"
    },
    ...(user?.role === "admin"
      ? [
          {
            name: "Users",
            href: "/dashboard/users",
            icon: UserGroupIcon,
            current: location.pathname === "/dashboard/users",
            color: "from-red-500 to-red-600"
          }
        ]
      : [])
  ];

  // Real-time notifications
  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('notification', (notification: Notification) => {
      setNotifications(prev => [notification, ...prev].slice(0, 5));
    });

    return () => {
      socket.off('connect');
      socket.off('notification');
    };
  }, []);

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <motion.div
        initial={{ width: 280 }}
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden lg:flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <SparklesIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                  PJP Dashboard
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Premium SaaS
                </p>
              </div>
            </motion.div>
          )}
          
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {sidebarCollapsed ? (
              <ChevronRightIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronLeftIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigation.map((item, index) => (
            <Link
              key={item.name}
              to={item.href}
              className={`group relative flex items-center p-3 rounded-xl transition-all duration-200 ${
                item.current
                  ? "bg-gradient-to-r " + item.color + " text-white shadow-lg"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                item.current ? "bg-white/20" : "bg-gray-100 dark:bg-gray-700"
              }`}>
                <item.icon
                  className={`h-5 w-5 ${
                    item.current ? "text-white" : "text-gray-600 dark:text-gray-400"
                  }`}
                />
              </div>
              
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="ml-3"
                >
                  <p className="font-medium">{item.name}</p>
                </motion.div>
              )}

              {/* Hover effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity" />
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          {!sidebarCollapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {user?.role}
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                Logout
              </button>
            </motion.div>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          )}
        </div>
      </motion.div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-50 flex lg:hidden"
          >
            <div className="w-72 bg-white dark:bg-gray-800 shadow-2xl">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <SparklesIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                      PJP Dashboard
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Premium SaaS
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <nav className="p-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center p-3 rounded-xl transition-all duration-200 ${
                      item.current
                        ? "bg-gradient-to-r " + item.color + " text-white shadow-lg"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      item.current ? "bg-white/20" : "bg-gray-100 dark:bg-gray-700"
                    }`}>
                      <item.icon
                        className={`h-5 w-5 ${
                          item.current ? "text-white" : "text-gray-600 dark:text-gray-400"
                        }`}
                      />
                    </div>
                    <span className="ml-3 font-medium">{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div
              className="flex-1 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Bars3Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
              
              <motion.h1
                key={location.pathname}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl font-bold text-gray-900 dark:text-white"
              >
                {navigation.find((item) => item.current)?.name || "Dashboard"}
              </motion.h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <BellIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  
                  {unreadCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                    >
                      {unreadCount}
                    </motion.div>
                  )}
                </button>

                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ type: "spring", damping: 25 }}
                      className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                    >
                      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          Notifications
                        </h3>
                        {notifications.length > 0 && (
                          <button
                            onClick={clearNotifications}
                            className="text-sm text-blue-600 hover:text-blue-700"
                          >
                            Clear all
                          </button>
                        )}
                      </div>
                      
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                            No notifications
                          </div>
                        ) : (
                          notifications.map((notification) => (
                            <motion.div
                              key={notification.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              onClick={() => markNotificationAsRead(notification.id)}
                              className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                                !notification.read ? "bg-blue-50 dark:bg-blue-900/20" : ""
                              }`}
                            >
                              <div className="flex items-start space-x-3">
                                <div
                                  className={`w-2 h-2 rounded-full mt-2 ${
                                    notification.type === "success"
                                      ? "bg-green-500"
                                      : notification.type === "warning"
                                      ? "bg-yellow-500"
                                      : notification.type === "error"
                                      ? "bg-red-500"
                                      : "bg-blue-500"
                                  }`}
                                />
                                <div className="flex-1">
                                  <p className="text-sm text-gray-900 dark:text-white">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {new Date(notification.timestamp).toLocaleTimeString()}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Advanced Theme Toggle */}
              <AdvancedThemeToggle />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-y-auto"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};

export default DashboardLayoutPremium;
