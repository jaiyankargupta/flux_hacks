# Healthcare Wellness & Preventive Care Portal

> **HCLTech "Supercharging" Hackathon - November 15th**

A comprehensive healthcare platform focused on wellness and preventive care, helping patients achieve health goals and maintain checkup compliance while providing healthcare providers with tools to monitor patient progress.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Business Use Case](#business-use-case)
- [Key Features](#key-features)
- [Technical Stack](#technical-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Security & Compliance](#security--compliance)
- [Deployment](#deployment)
- [CI/CD Pipeline](#cicd-pipeline)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

The Healthcare Wellness & Preventive Care Portal is an MVP solution developed for the HCLTech Hackathon, designed to revolutionize how patients and healthcare providers interact with wellness and preventive care data. The platform emphasizes:

- **Usability**: Intuitive interface for both patients and providers
- **Responsive Design**: Seamless experience across all devices
- **Security**: HIPAA-compliant data handling and encryption
- **Personalization**: Tailored health insights and recommendations
- **Healthcare Compliance**: Adherence to healthcare industry standards

---

## 💼 Business Use Case

### Problem Statement
Patients often struggle to maintain consistent wellness routines and preventive care schedules, while healthcare providers lack efficient tools to monitor patient compliance and progress.

### Solution
Our portal bridges this gap by providing:
- **For Patients**: 
  - Real-time wellness goal tracking
  - Automated preventive care reminders
  - Personalized health insights
  - Easy profile and health information management

- **For Healthcare Providers**:
  - Comprehensive patient compliance dashboard
  - Quick access to patient wellness metrics
  - Efficient monitoring of preventive care adherence

---

## ✨ Key Features

### 🔐 Secure Authentication System
- User registration and login for patients and healthcare providers
- JWT-based session management
- Password hashing with bcrypt
- Role-based access control (RBAC)

### 👤 Patient Dashboard
- **Wellness Goals Tracking**:
  - Steps taken
  - Active time
  - Sleep hours
  - Calories burned
  - Fluid intake
- **Preventive Care Reminders**:
  - Upcoming blood tests
  - Scheduled checkups
  - Vaccination reminders
- **Health Tip of the Day**: Daily personalized health recommendations

### 📝 Profile Management
- View and edit personal information
- Manage health data:
  - Allergies
  - Current medications
  - Medical history
  - Emergency contacts

### 🏥 Healthcare Provider View
- Patient list with compliance status
- Individual patient goal tracking
- Compliance indicators:
  - ✅ Goal Met
  - ⚠️ Missed Preventive Checkup
- Detailed patient health metrics

### 📊 Goal Tracker
- Log daily wellness metrics:
  - Steps
  - Water intake
  - Exercise duration
  - Sleep quality
  - Nutrition tracking

### 📰 Public Health Information Page
- General health information
- Healthcare policies
- COVID-19 updates
- Seasonal flu prevention
- Mental health awareness resources

### 🔒 Privacy & Security Measures
- User action logging for data access
- Consent management during registration
- Data encryption at rest and in transit
- HIPAA compliance measures

---

## 🛠 Technical Stack

### Frontend
- **Framework**: ReactJS or NextJS
- **Styling**: CSS Modules / Sass
- **State Management**: React Context API / Redux
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Alternative**: Python Django or JSON Server
- **API Architecture**: RESTful API

### Database
- **Type**: NoSQL
- **Options**: 
  - MongoDB
  - DynamoDB
  - Firestore

### Authentication & Security
- **Authentication**: JWT (JSON Web Token)
- **Password Hashing**: bcrypt
- **Authorization**: Role-based access control

### Deployment
- **Cloud Platform**: AWS / Azure / GCP / Vercel / Netlify
- **Environment Management**: dotenv
- **CI/CD**: GitHub Actions

---

## 🏗 Architecture

### System Architecture
```
┌─────────────────┐
│   Frontend      │
│  (React/Next)   │
└────────┬────────┘
         │
         │ HTTPS/REST API
         │
┌────────▼────────┐
│   Backend API   │
│  (Node/Express) │
└────────┬────────┘
         │
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼──────┐
│NoSQL  │ │  Auth   │
│  DB   │ │ Service │
└───────┘ └─────────┘
```

### Key Architectural Principles
- **Separation of Concerns**: Clear separation between frontend, backend, and data layers
- **Scalability**: Designed to handle growing user base
- **Security**: Secure data flow with encryption and access controls
- **Reliability**: Comprehensive error handling and logging
- **Maintainability**: Modular code structure

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flux_hacks
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Environment Configuration**
   
   Create `.env` file in the backend directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/healthcare-portal
   
   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   
   # Frontend URL
   FRONTEND_URL=http://localhost:3000
   
   # Email Configuration (Optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_password
   ```

5. **Run the Application**
   
   Backend:
   ```bash
   cd backend
   npm run dev
   ```
   
   Frontend:
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001

---

## 📁 Project Structure

```
flux_hacks/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Dashboard/
│   │   │   ├── Profile/
│   │   │   └── Provider/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── utils/
│   │   └── App.js
│   ├── package.json
│   └── .env
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── server.js
│   ├── package.json
│   └── .env
├── .github/
│   └── workflows/
│       └── ci-cd.yml
└── README.md
```

---

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "role": "patient",
  "consentGiven": true
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

### Patient Endpoints

#### Get Patient Dashboard
```http
GET /api/patient/dashboard
Authorization: Bearer <token>
```

#### Update Wellness Goals
```http
POST /api/patient/goals
Authorization: Bearer <token>
Content-Type: application/json

{
  "steps": 8500,
  "activeTime": 45,
  "sleep": 7.5,
  "waterIntake": 2000
}
```

### Provider Endpoints

#### Get Patient List
```http
GET /api/provider/patients
Authorization: Bearer <token>
```

#### Get Patient Details
```http
GET /api/provider/patients/:patientId
Authorization: Bearer <token>
```

---

## 🔒 Security & Compliance

### HIPAA Compliance Measures
- **Data Encryption**: AES-256 encryption at rest, TLS 1.3 in transit
- **Access Controls**: Role-based access with JWT authentication
- **Audit Logging**: Comprehensive logging of all data access
- **Data Minimization**: Only collect necessary health information
- **User Consent**: Explicit consent collection during registration

### Security Best Practices
- Password hashing with bcrypt (10+ rounds)
- JWT token expiration and refresh mechanisms
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF protection
- Rate limiting on API endpoints

---

## 🌐 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
# Build the frontend
cd frontend
npm run build

# Deploy to Vercel
vercel --prod

# Or deploy to Netlify
netlify deploy --prod
```

### Backend Deployment (AWS/Heroku/Railway)
```bash
# Ensure environment variables are set
# Deploy to your chosen platform

# Example: Heroku
heroku create healthcare-portal-api
git push heroku main
```

### Database Setup
- **MongoDB Atlas**: Create a cluster and update `MONGODB_URI`
- **AWS DynamoDB**: Configure tables and update connection settings
- **Firestore**: Set up project and update credentials

---

## 🔄 CI/CD Pipeline

GitHub Actions workflow for automated testing and deployment:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to production
        run: echo "Deploying to production..."
```

---

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is developed for the HCLTech Hackathon. All rights reserved.

---

## 📞 Contact & Support

For questions or support, please contact the development team.

---

## 🙏 Acknowledgments

- HCLTech for organizing the "Supercharging" Hackathon
- Healthcare professionals for domain expertise
- Open-source community for amazing tools and libraries

---

**Built with ❤️ for better healthcare outcomes**