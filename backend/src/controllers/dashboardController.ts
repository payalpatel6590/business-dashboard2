import { Request, Response } from 'express';
import Sale from '../models/Sale';
import Revenue from '../models/Revenue';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

export const getDashboardStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.role === 'admin' ? {} : { userId: req.user!._id };
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Get current month stats
    const [currentSales, currentRevenue, currentUsers] = await Promise.all([
      Sale.aggregate([
        { $match: { ...userId, date: { $gte: thisMonth } } },
        { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }
      ]),
      Revenue.aggregate([
        { $match: { ...userId, date: { $gte: thisMonth } } },
        { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }
      ]),
      req.user!.role === 'admin' ? 
        User.countDocuments({ createdAt: { $gte: thisMonth } }) : 
        Promise.resolve(0)
    ]);

    // Get last month stats for growth calculation
    const [lastMonthSales, lastMonthRevenue, lastMonthUsers] = await Promise.all([
      Sale.aggregate([
        { $match: { ...userId, date: { $gte: lastMonth, $lt: thisMonth } } },
        { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }
      ]),
      Revenue.aggregate([
        { $match: { ...userId, date: { $gte: lastMonth, $lt: thisMonth } } },
        { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }
      ]),
      req.user!.role === 'admin' ? 
        User.countDocuments({ createdAt: { $gte: lastMonth, $lt: thisMonth } }) : 
        Promise.resolve(0)
    ]);

    // Calculate totals
    const totalSales = currentSales[0]?.total || 0;
    const totalRevenue = currentRevenue[0]?.total || 0;
    const totalUsers = req.user!.role === 'admin' ? await User.countDocuments() : 0;

    // Calculate growth percentages
    const lastMonthSalesTotal = lastMonthSales[0]?.total || 0;
    const lastMonthRevenueTotal = lastMonthRevenue[0]?.total || 0;

    const salesGrowth = lastMonthSalesTotal > 0 
      ? ((totalSales - lastMonthSalesTotal) / lastMonthSalesTotal) * 100 
      : 0;
    const revenueGrowth = lastMonthRevenueTotal > 0 
      ? ((totalRevenue - lastMonthRevenueTotal) / lastMonthRevenueTotal) * 100 
      : 0;
    const userGrowth = lastMonthUsers > 0 
      ? ((currentUsers - lastMonthUsers) / lastMonthUsers) * 100 
      : 0;

    res.status(200).json({
      success: true,
      data: {
        totalSales,
        totalRevenue,
        totalUsers,
        salesGrowth: parseFloat(salesGrowth.toFixed(2)),
        revenueGrowth: parseFloat(revenueGrowth.toFixed(2)),
        userGrowth: parseFloat(userGrowth.toFixed(2))
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Server error fetching dashboard stats'
    });
  }
};

export const getSalesData = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { startDate, endDate, category } = req.query;
    const userId = req.user!.role === 'admin' ? {} : { userId: req.user!._id };
    
    const matchQuery: any = userId;
    
    if (startDate && endDate) {
      matchQuery.date = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string)
      };
    }
    
    if (category && category !== 'all') {
      matchQuery.category = category;
    }

    const sales = await Sale.find(matchQuery)
      .sort({ date: -1 })
      .populate('userId', 'name email');

    res.status(200).json({
      success: true,
      data: sales
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Server error fetching sales data'
    });
  }
};

export const getRevenueData = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { startDate, endDate, source } = req.query;
    const userId = req.user!.role === 'admin' ? {} : { userId: req.user!._id };
    
    const matchQuery: any = userId;
    
    if (startDate && endDate) {
      matchQuery.date = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string)
      };
    }
    
    if (source && source !== 'all') {
      matchQuery.source = source;
    }

    const revenue = await Revenue.find(matchQuery)
      .sort({ date: -1 })
      .populate('userId', 'name email');

    res.status(200).json({
      success: true,
      data: revenue
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Server error fetching revenue data'
    });
  }
};

export const getChartData = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { type, period } = req.query;
    const userId = req.user!.role === 'admin' ? {} : { userId: req.user!._id };
    
    let dateFormat: string;
    let startDate: Date;
    
    switch (period) {
      case '7days':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        dateFormat = '%Y-%m-%d';
        break;
      case '30days':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        dateFormat = '%Y-%m-%d';
        break;
      case '12months':
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 12);
        dateFormat = '%Y-%m';
        break;
      default:
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        dateFormat = '%Y-%m-%d';
    }

    const matchQuery = {
      ...userId,
      date: { $gte: startDate }
    };

    let data;
    
    if (type === 'sales') {
      data = await Sale.aggregate([
        { $match: matchQuery },
        {
          $group: {
            _id: { $dateToString: { format: dateFormat, date: '$date' } },
            amount: { $sum: '$amount' },
            count: { $sum: 1 }
          }
        },
        { $sort: { '_id': 1 } }
      ]);
    } else if (type === 'revenue') {
      data = await Revenue.aggregate([
        { $match: matchQuery },
        {
          $group: {
            _id: { $dateToString: { format: dateFormat, date: '$date' } },
            amount: { $sum: '$amount' },
            count: { $sum: 1 }
          }
        },
        { $sort: { '_id': 1 } }
      ]);
    } else {
      res.status(400).json({
        success: false,
        error: 'Invalid chart type. Must be sales or revenue'
      });
      return;
    }

    const labels = data.map(item => item._id);
    const amounts = data.map(item => item.amount);

    res.status(200).json({
      success: true,
      data: {
        labels,
        datasets: [{
          label: type === 'sales' ? 'Sales' : 'Revenue',
          data: amounts,
          backgroundColor: type === 'sales' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(34, 197, 94, 0.5)',
          borderColor: type === 'sales' ? 'rgba(59, 130, 246, 1)' : 'rgba(34, 197, 94, 1)'
        }]
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Server error fetching chart data'
    });
  }
};

export const createSale = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const saleData = {
      ...req.body,
      userId: req.user!._id
    };

    const sale = await Sale.create(saleData);
    await sale.populate('userId', 'name email');

    res.status(201).json({
      success: true,
      data: sale
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Server error creating sale'
    });
  }
};

export const createRevenue = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const revenueData = {
      ...req.body,
      userId: req.user!._id
    };

    const revenue = await Revenue.create(revenueData);
    await revenue.populate('userId', 'name email');

    res.status(201).json({
      success: true,
      data: revenue
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Server error creating revenue'
    });
  }
};
