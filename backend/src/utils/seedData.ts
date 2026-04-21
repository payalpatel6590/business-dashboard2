import mongoose from 'mongoose';
import User from '../models/User';
import Sale from '../models/Sale';
import Revenue from '../models/Revenue';
import bcrypt from 'bcryptjs';

const seedData = async (): Promise<void> => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Sale.deleteMany({});
    await Revenue.deleteMany({});

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin'
    });

    // Create regular user
    const userPassword = await bcrypt.hash('user123', 10);
    const user = await User.create({
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

    await Sale.insertMany(salesData);

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

    await Revenue.insertMany(revenueData);

    console.log('Database seeded successfully!');
    console.log('Admin credentials: admin@example.com / admin123');
    console.log('User credentials: user@example.com / user123');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

export default seedData;
