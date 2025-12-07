# HCLTech Hackathon: Healthcare Wellness & Preventive Care Portal

**Event**: HCLTech "Supercharging" Hackathon  
**Date**: November 15th

A comprehensive **Healthcare Wellness and Preventive Care Portal** designed to specific Hackathon requirements. The core purpose is to help users maintain checkup compliance, track wellness goals, and access preventive care information effortlessly. Developed as a **Minimum Viable Product (MVP)** within the hackathon's 5-hour constraint, it prioritizes usability, responsive design, security, and healthcare data compliance.

## 🏗 Architecture

The application follows the **MERN** (MongoDB, Express.js, React, Node.js) architecture, ensuring scalability and a clear separation of concerns between the frontend, backend, and data layers:

*   **Client (Frontend)**: A responsive Single Page Application (SPA) built with **React.js (Vite)**, focusing on a premium, user-friendly interface.
*   **Server (Backend)**: A **Node.js/Express.js** RESTful API server handling business logic, secure data flow, and database interactions.
*   **Database**: **MongoDB** (NoSQL) for flexible schema storage of patient profiles, health logs, and provider assignments.

### Key Architectural Patterns:
*   **MVC Pattern**: Structured backend using Controllers, Models, and Routes.
*   **Secure Authentication**: **JWT (JSON Web Token)** based session management with bcrypted password hashing.
*   **RBAC (Role-Based Access Control)**: Strict middleware gates for `admin`, `provider`, and `patient` roles.

## 🛠 Tech Stack

### Frontend
*   **Framework**: [React](https://react.dev/) (v19) via [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4) for responsive, modern UI.
*   **Routing**: [React Router DOM](https://reactrouter.com/) (v7)
*   **State**: Context API for global auth state.
*   **HTTP Client**: [Axios](https://axios-http.com/)

### Backend
*   **Runtime**: [Node.js](https://nodejs.org/)
*   **Framework**: [Express.js](https://expressjs.com/) (v5)
*   **Database ODM**: [Mongoose](https://mongoosejs.com/)
*   **Security**: bcryptjs (hashing), jsonwebtoken (auth), cors, express-validator.

## ✨ Key Features (MVP)

### � Secure Authentication System
*   **Universal Access**: Unified login/registration for Patients and Healthcare Providers.
*   **Security**: JWT-based session management, password hashing, and secure 1-way encryption.
*   **Consent**: Integrated data usage consent checkbox during registration.

### 👤 Patient Dashboard
*   **Wellness Goals**: Visual progress tracking (e.g., goals status).
*   **Preventive Care**: Reminders for upcoming checkups (e.g., blood tests).
*   **Daily Insights**: "Health Tip of the Day" widget.
*   **Goal Tracker**: Log daily metrics steps or water intake.
*   **Profile Management**: Edit personal info including allergies and current medications.

### 🩺 Healthcare Provider View
*   **Patient Oversight**: View list of assigned patients.
*   **Compliance Monitoring**: Quick-view status indicators (e.g., "Goal Met" or "Missed Checkup").
*   **Detailed Drill-down**: Clickable patient cards to view specific history and compliance data.

### ℹ️ Public Health Information
*   **Static Resource**: A dedicated page displaying general health guidelines, wellness policies, and preventive care information accessible to all users.

### 🛡 Admin & Platform
*   **System Overview**: Stats for total patients/providers.
*   **User Management**: Ability to manage provider access.
*   **Logging**: Basic logging system for tracking data access events (backend).

## 🚀 Installation & Setup

### Prerequisites
*   Node.js (v14+)
*   npm or yarn
*   MongoDB Instance (Local or Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/jaiyankargupta/flux_hacks.git
cd flux_hacks
```

### 2. Backend Setup
1.  Navigate to backend: `cd backend`
2.  Install dependencies: `npm install`
3.  Create `.env`:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_secure_secret
    NODE_ENV=development
    ```
4.  Start server: `npm run dev`

### 3. Frontend Setup
1.  Navigate to client: `cd ../client`
2.  Install dependencies: `npm install`
3.  Create `.env`:
    ```env
    VITE_API_URL=http://localhost:5000/api
    ```
4.  Start client: `npm run dev`

## 📦 Deployment

### Cloud Platforms
*   **Frontend**: Ready for Vercel/Netlify deployment.
*   **Backend**: Ready for Render/Heroku.
*   **CI/CD**: Structure supports Basic GitHub Actions workflows for automated testing/deployment.

## 📄 API Documentation
Refer to [API_DOCS.md](API_DOCS.md) for detailed endpoint usage.