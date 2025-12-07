require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const connectDB = require('./config/db');

// Connect to database
connectDB();

const createAdmin = async () => {
    try {
        // Check if admin already exists
        const adminExists = await User.findOne({ email: 'admin@healthcare.com' });

        if (adminExists) {
            console.log('❌ Admin user already exists');
            process.exit(0);
        }

        // Create admin user
        const admin = await User.create({
            name: 'System Administrator',
            email: 'admin@healthcare.com',
            password: 'admin123', // Change this in production!
            role: 'admin',
            consentGiven: true,
        });

        console.log('✅ Admin user created successfully');
        console.log('📧 Email: admin@healthcare.com');
        console.log('🔑 Password: admin123');
        console.log('⚠️  Please change the password after first login!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin:', error.message);
        process.exit(1);
    }
};

createAdmin();
