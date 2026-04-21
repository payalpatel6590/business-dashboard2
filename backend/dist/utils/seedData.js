"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const Sale_1 = __importDefault(require("../models/Sale"));
const Revenue_1 = __importDefault(require("../models/Revenue"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const seedData = async () => {
    try {
        // Clear existing data
        await User_1.default.deleteMany({});
        await Sale_1.default.deleteMany({});
        await Revenue_1.default.deleteMany({});
        // Create admin user
        const adminPassword = await bcryptjs_1.default.hash('admin123', 10);
        const admin = await User_1.default.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: adminPassword,
            role: 'admin'
        });
        // Create regular user
        const userPassword = await bcryptjs_1.default.hash('user123', 10);
        const user = await User_1.default.create({
            name: 'Regular User',
            email: 'user@example.com',
            password: userPassword,
            role: 'user'
        });
        // Sample sales data
        const salesData = [
            {
                amount: 1500,
                category: 'electronics',
                date: new Date('2024-01-15'),
                description: 'Laptop sale',
                userId: admin._id
            },
            {
                amount: 250,
                category: 'clothing',
                date: new Date('2024-01-20'),
                description: 'Winter jacket',
                userId: user._id
            },
            {
                amount: 800,
                category: 'software',
                date: new Date('2024-02-01'),
                description: 'Software license',
                userId: admin._id
            },
            {
                amount: 450,
                category: 'services',
                date: new Date('2024-02-10'),
                description: 'Consulting services',
                userId: user._id
            },
            {
                amount: 1200,
                category: 'electronics',
                date: new Date('2024-02-15'),
                description: 'Smartphone sale',
                userId: admin._id
            }
        ];
        await Sale_1.default.insertMany(salesData);
        // Sample revenue data
        const revenueData = [
            {
                amount: 5000,
                source: 'sales',
                date: new Date('2024-01-31'),
                userId: admin._id
            },
            {
                amount: 1500,
                source: 'subscriptions',
                date: new Date('2024-02-15'),
                userId: admin._id
            },
            {
                amount: 800,
                source: 'consulting',
                date: new Date('2024-02-20'),
                userId: user._id
            },
            {
                amount: 2000,
                source: 'advertising',
                date: new Date('2024-02-25'),
                userId: admin._id
            },
            {
                amount: 1200,
                source: 'licensing',
                date: new Date('2024-03-01'),
                userId: admin._id
            }
        ];
        await Revenue_1.default.insertMany(revenueData);
        console.log('Database seeded successfully!');
        console.log('Admin credentials: admin@example.com / admin123');
        console.log('User credentials: user@example.com / user123');
    }
    catch (error) {
        console.error('Error seeding database:', error);
    }
};
exports.default = seedData;
//# sourceMappingURL=seedData.js.map