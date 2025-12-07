require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const HealthTip = require('./models/HealthTip');

const healthTips = [
    {
        title: 'Stay Hydrated',
        content: 'Drink at least 8 glasses of water daily to maintain optimal health and energy levels.',
        category: 'general',
    },
    {
        title: 'Regular Exercise',
        content: 'Aim for at least 30 minutes of moderate exercise 5 days a week to improve cardiovascular health.',
        category: 'exercise',
    },
    {
        title: 'Balanced Diet',
        content: 'Include a variety of fruits, vegetables, whole grains, and lean proteins in your daily meals.',
        category: 'nutrition',
    },
    {
        title: 'Quality Sleep',
        content: 'Get 7-9 hours of sleep each night to support physical recovery and mental well-being.',
        category: 'sleep',
    },
    {
        title: 'Mental Health Matters',
        content: 'Practice mindfulness or meditation for 10 minutes daily to reduce stress and anxiety.',
        category: 'mental-health',
    },
    {
        title: 'COVID-19 Prevention',
        content: 'Wash hands frequently, wear masks in crowded places, and maintain social distancing.',
        category: 'covid-19',
    },
    {
        title: 'Seasonal Flu Prevention',
        content: 'Get your annual flu shot and maintain good hygiene practices during flu season.',
        category: 'seasonal',
    },
    {
        title: 'Regular Checkups',
        content: 'Schedule annual health screenings and preventive care appointments with your healthcare provider.',
        category: 'general',
    },
];

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing health tips
        await HealthTip.deleteMany();
        console.log('🗑️  Cleared existing health tips');

        // Insert new health tips
        await HealthTip.insertMany(healthTips);
        console.log('✅ Health tips seeded successfully');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
