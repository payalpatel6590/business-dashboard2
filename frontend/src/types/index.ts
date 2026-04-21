export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}

export interface Sale {
  _id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Revenue {
  _id: string;
  amount: number;
  source: string;
  date: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalSales: number;
  totalRevenue: number;
  totalUsers: number;
  salesGrowth: number;
  revenueGrowth: number;
  userGrowth: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
}

export interface SaleFormData {
  amount: number;
  category: string;
  date: string;
  description: string;
}

export interface RevenueFormData {
  amount: number;
  source: string;
  date: string;
}
