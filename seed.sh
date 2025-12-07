#!/bin/bash

# Healthcare Wellness Portal - Database Seed Script
# This script seeds the database with initial health tips

echo "🌱 Healthcare Wellness Portal - Database Seeding"
echo "================================================"
echo ""

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "❌ MongoDB is not running!"
    echo "   Please start MongoDB first:"
    echo "   - Using Homebrew: brew services start mongodb-community"
    echo "   - Using Docker: docker run -d -p 27017:27017 --name mongodb mongo:latest"
    exit 1
fi

echo "✅ MongoDB is running"
echo ""

echo "🌱 Seeding database with health tips..."
cd backend
node src/seed.js

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Database seeded successfully!"
    echo "   8 health tips have been added to the database"
else
    echo ""
    echo "❌ Failed to seed database"
    exit 1
fi

cd ..
echo ""
echo "✅ Setup complete! You can now start the application with: ./start.sh"
