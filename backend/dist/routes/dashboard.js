"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboardController_1 = require("../controllers/dashboardController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// All dashboard routes require authentication
router.use(auth_1.authenticate);
// Public dashboard routes (accessible by both admin and user)
router.get('/stats', dashboardController_1.getDashboardStats);
router.get('/sales', dashboardController_1.getSalesData);
router.get('/revenue', dashboardController_1.getRevenueData);
router.get('/chart', dashboardController_1.getChartData);
// Create new data (accessible by both admin and user)
router.post('/sales', dashboardController_1.createSale);
router.post('/revenue', dashboardController_1.createRevenue);
// Admin only routes can be added here if needed
// router.get('/admin/users', authorize('admin'), getUsers);
exports.default = router;
//# sourceMappingURL=dashboard.js.map