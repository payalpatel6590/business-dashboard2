import { Router } from 'express';
import {
  getDashboardStats,
  getSalesData,
  getRevenueData,
  getChartData,
  createSale,
  createRevenue
} from '../controllers/dashboardController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// All dashboard routes require authentication
router.use(authenticate);

// Public dashboard routes (accessible by both admin and user)
router.get('/stats', getDashboardStats);
router.get('/sales', getSalesData);
router.get('/revenue', getRevenueData);
router.get('/chart', getChartData);

// Create new data (accessible by both admin and user)
router.post('/sales', createSale);
router.post('/revenue', createRevenue);

// Admin only routes can be added here if needed
// router.get('/admin/users', authorize('admin'), getUsers);

export default router;
