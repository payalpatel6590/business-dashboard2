import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare const getDashboardStats: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getSalesData: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getRevenueData: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getChartData: (req: AuthRequest, res: Response) => Promise<void>;
export declare const createSale: (req: AuthRequest, res: Response) => Promise<void>;
export declare const createRevenue: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=dashboardController.d.ts.map