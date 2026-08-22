require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/zerodha_clone';
    await mongoose.connect(mongoUri);

    console.log('MongoDB Connected.');

    const adminEmail = 'admin@zerodha.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('Admin user already exists.');
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    await User.create({
      name: 'System Admin',
      email: adminEmail,
      password: hashedPassword,
      balance: 9999999, // Admins get unlimited virtual balance
      role: 'admin'
    });

    console.log('Admin user seeded successfully!');
    console.log('Email: admin@zerodha.com');
    console.log('Password: admin123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();
