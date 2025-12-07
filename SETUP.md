# Quick Setup Guide

## Prerequisites

### Install MongoDB

**Option 1: Using Homebrew (Mac)**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Option 2: Using Docker**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Option 3: Use MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `backend/.env` with your connection string

## Setup Steps

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies
```bash
cd client
npm install
```

### 3. Configure Environment Variables

Make sure `backend/.env` has:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/healthcare-portal
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

### 4. Seed Database (Optional but Recommended)
```bash
cd backend
node src/seed.js
```

This will populate health tips in the database.

### 5. Start Backend Server
```bash
cd backend
npm run dev
```

Backend should be running on http://localhost:5000

### 6. Start Frontend Server (in a new terminal)
```bash
cd client
npm run dev
```

Frontend should be running on http://localhost:3000

## Testing the Application

### 1. Register a Patient Account
- Go to http://localhost:3000
- Click "Register"
- Fill in details and select "Patient" role
- Check the consent checkbox
- Submit

### 2. Test Patient Dashboard
- You'll be redirected to the patient dashboard
- Update your wellness goals
- View health tip of the day

### 3. Register a Provider Account
- Logout
- Register again with "Healthcare Provider" role

### 4. Test Provider Dashboard
- View list of patients
- Click on a patient to see details
- Create a reminder for the patient

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running: `brew services list`
- Or use MongoDB Atlas cloud database

### Port Already in Use
- Change PORT in backend/.env
- Change port in client/vite.config.js

### CORS Errors
- Make sure FRONTEND_URL in backend/.env matches your frontend URL

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user
- PUT `/api/auth/profile` - Update profile

### Patient Routes (Requires Authentication)
- GET `/api/patient/dashboard` - Get dashboard data
- POST `/api/patient/goals` - Update goals
- GET `/api/patient/goals/history` - Get goal history
- GET `/api/patient/reminders` - Get reminders
- PUT `/api/patient/reminders/:id/complete` - Complete reminder

### Provider Routes (Requires Authentication)
- GET `/api/provider/patients` - Get all patients
- GET `/api/provider/patients/:id` - Get patient details
- POST `/api/provider/patients/:id/reminders` - Create reminder

## Default Test Data

After seeding, you'll have 8 health tips in various categories:
- General health
- Nutrition
- Exercise
- Sleep
- Mental health
- COVID-19
- Seasonal flu

## Next Steps

1. Create test accounts (patient and provider)
2. Test all features
3. Check responsive design on different screen sizes
4. Deploy to production (optional)

---

**Need Help?** Check the IMPLEMENTATION.md file for more details!
