import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

const DashboardLayoutFixed: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {sidebarOpen && (
        <div className="fixed inset-0 flex z-50">
          <div className="w-64 bg-white p-4">
            <button onClick={() => setSidebarOpen(false)}>
              <XMarkIcon className="h-6 w-6" />
            </button>

            <Link to="/dashboard" className="block mt-4">
              Dashboard
            </Link>
          </div>

          <div
            className="flex-1 bg-black opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      <div className="p-4 bg-white flex justify-between">
        <button onClick={() => setSidebarOpen(true)}>
          <Bars3Icon className="h-6 w-6" />
        </button>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>

      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayoutFixed;