import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { io } from "socket.io-client";
import { useAuth } from "../../contexts/AuthContext";
import ThemeToggle from "../Common/ThemeToggle";

import {
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

const socket = io(process.env.REACT_APP_SOCKET_URL);

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);

  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  ];

  // 🔴 Real-time notifications
  useEffect(() => {
    socket.on("notification", (data: string) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">

      {/* Sidebar */}
      <motion.div
        animate={{ width: collapsed ? 80 : 250 }}
        className="hidden lg:flex flex-col bg-white dark:bg-gray-800 border-r shadow-lg"
      >
        <div className="flex items-center justify-between p-4">
          {!collapsed && <span className="font-bold">Dashboard</span>}

          <button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? (
              <ChevronRightIcon className="h-5 w-5" />
            ) : (
              <ChevronLeftIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        <nav className="flex-1 space-y-2 px-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center p-2 rounded-md ${
                location.pathname === item.href
                  ? "bg-blue-100 text-blue-900"
                  : "hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="m-4 p-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </motion.div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed inset-0 z-50 flex lg:hidden"
          >
            <div className="w-64 bg-white p-4">
              <button onClick={() => setSidebarOpen(false)}>
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div
              className="flex-1 bg-black opacity-50"
              onClick={() => setSidebarOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow">

          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Bars3Icon className="h-6 w-6" />
            </button>

            <h1 className="font-semibold">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">

            {/* 🔔 Notifications */}
            <div className="relative">
              <button onClick={() => setNotificationsOpen(!notificationsOpen)}>
                <BellIcon className="h-6 w-6" />
              </button>

              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1">
                  {notifications.length}
                </span>
              )}

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded p-2"
                  >
                    {notifications.length === 0 ? (
                      <p className="text-sm text-gray-500">
                        No notifications
                      </p>
                    ) : (
                      notifications.map((n, i) => (
                        <div key={i} className="p-2 border-b text-sm">
                          {n}
                        </div>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <ThemeToggle />
          </div>
        </div>

        {/* Page Animation */}
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 flex-1"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};

export default DashboardLayout;