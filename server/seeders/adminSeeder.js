const mongoose = require('mongoose');
const User = require('../models/user');
require('dotenv').config();

const createAdminUser = async () => {
  try {
    // Check if admin user exists
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (!adminExists) {
      const adminUser = new User({
        name: 'Admin User',
        email: process.env.ADMIN_EMAIL || 'admin@contentkosh.com',
        password: process.env.ADMIN_PASSWORD || 'Admin@123',
        role: 'admin',
        isEmailVerified: true,
        status: 'active'
      });

      await adminUser.save();
      console.log('Admin user created successfully');
      console.log('Email:', adminUser.email);
      console.log('Password: Admin@123 (if not set in env)');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

// Connect to MongoDB and create admin
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    return createAdminUser();
  })
  .then(() => {
    console.log('Admin seeder completed');
    process.exit(0);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }); 