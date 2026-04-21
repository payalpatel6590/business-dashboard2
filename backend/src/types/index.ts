export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Sale {
  _id?: string;
  amount: number;
  category: string;
  date: Date;
  description: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Revenue {
  _id?: string;
  amount: number;
  source: string;
  date: Date;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
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
