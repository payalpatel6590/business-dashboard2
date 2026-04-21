import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import ThemeToggle from "../Common/ThemeToggle";
import {
  Bars3Icon,
  XMarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const DashboardLayoutFinal: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">

      {sidebarOpen && (
        <div className="fixed inset-0 flex z-50">
          <div className="w-64 bg-white p-4">
            <button onClick={() => setSidebarOpen(false)}>
              <XMarkIcon className="h-6 w-6" />
            </button>

            <p className="mt-4">{user?.name}</p>
          </div>

          <div className="flex-1 bg-black opacity-50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      <div className="lg:ml-64">
        <div className="p-4 bg-white flex justify-between">
          <button onClick={() => setSidebarOpen(true)}>
            <Bars3Icon className="h-6 w-6" />
          </button>
          <ThemeToggle />
        </div>

        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayoutFinal;