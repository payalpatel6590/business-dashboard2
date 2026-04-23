import axios from 'axios';
import { ApiResponse, AuthResponse, LoginCredentials, RegisterCredentials, DashboardStats, Sale, Revenue, ChartData, SaleFormData, RevenueFormData } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API


export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/login', credentials);
    return response.data.data!;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/register', credentials);
    return response.data.data!;
  },

  getProfile: async (): Promise<any> => {
    const response = await api.get('/api/auth/profile');
    return response.data.data;
  },
};



// Dashboard API


export const dashboardAPI = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await api.get('/api/dashboard/stats');
    return response.data.data!;
  },

  getSales: async (filters?: { startDate?: string; endDate?: string; category?: string }): Promise<Sale[]> => {
    const params = new URLSearchParams();
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    if (filters?.category) params.append('category', filters.category);
    
    const response = await api.get(`/api/dashboard/sales?${params}`);
    return response.data.data!;
  },

  getRevenue: async (filters?: { startDate?: string; endDate?: string; source?: string }): Promise<Revenue[]> => {
    const params = new URLSearchParams();
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    if (filters?.source) params.append('source', filters.source);
    
    const response = await api.get(`/api/dashboard/revenue?${params}`);
    return response.data.data!;
  },

  getChartData: async (type: 'sales' | 'revenue', period: string): Promise<ChartData> => {
    const response = await api.get(`/api/dashboard/chart?type=${type}&period=${period}`);
    return response.data.data!;
  },

  createSale: async (saleData: SaleFormData): Promise<Sale> => {
    const response = await api.post('/api/dashboard/sales', saleData);
    return response.data.data!;
  },

  createRevenue: async (revenueData: RevenueFormData): Promise<Revenue> => {
    const response = await api.post('/api/dashboard/revenue', revenueData);
    return response.data.data!;
  },
};

export default api;
