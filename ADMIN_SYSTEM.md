# Admin System Documentation

## Overview
The admin system allows administrators to manage healthcare providers in the system. Patients can only register themselves, while healthcare providers must be added by administrators.

## Changes Made

### Backend Changes

1. **User Model Update** (`/backend/src/models/User.js`)
   - Added `admin` role to the role enum
   - Roles: `patient`, `provider`, `admin`

2. **Admin Controller** (`/backend/src/controllers/adminController.js`)
   - `getAllProviders()` - Get list of all providers
   - `getProvider(id)` - Get single provider details
   - `createProvider(data)` - Create new provider
   - `updateProvider(id, data)` - Update provider information
   - `deleteProvider(id)` - Delete provider (unassigns all patients)
   - `getAllPatients()` - Get list of all patients
   - `getDashboardStats()` - Get dashboard statistics
   - `resetProviderPassword(id, newPassword)` - Reset provider password

3. **Admin Routes** (`/backend/src/routes/admin.js`)
   - `GET /api/admin/stats` - Dashboard statistics
   - `GET /api/admin/providers` - List all providers
   - `POST /api/admin/providers` - Create provider
   - `GET /api/admin/providers/:id` - Get provider details
   - `PUT /api/admin/providers/:id` - Update provider
   - `DELETE /api/admin/providers/:id` - Delete provider
   - `PUT /api/admin/providers/:id/reset-password` - Reset password
   - `GET /api/admin/patients` - List all patients

4. **Server Configuration** (`/backend/src/server.js`)
   - Added admin routes: `app.use('/api/admin', require('./routes/admin'))`

5. **Admin Creation Script** (`/backend/src/createAdmin.js`)
   - Script to create initial admin user
   - Run with: `npm run create-admin`

### Frontend Changes

1. **Registration Page** (`/client/src/pages/Register.jsx`)
   - Removed provider role option
   - Only patients can self-register
   - Role is automatically set to 'patient'

2. **Admin Dashboard** (`/client/src/pages/AdminDashboard.jsx`)
   - Statistics cards showing:
     - Total patients
     - Total providers
     - Assigned patients
     - Unassigned patients
   - Provider management interface
   - Add/Edit/Delete provider functionality

3. **Admin Components**
   - `ProviderList.jsx` - Table view of all providers
   - `AddProviderModal.jsx` - Modal to add new provider
   - `EditProviderModal.jsx` - Modal to edit provider with password reset

4. **API Service** (`/client/src/services/api.js`)
   - Added `adminAPI` with all admin endpoints

5. **Routing** (`/client/src/App.jsx`)
   - Added admin dashboard route: `/admin/dashboard`
   - Protected with admin role authorization

6. **Login & Home Pages**
   - Updated to redirect admin users to `/admin/dashboard`

## Getting Started

### 1. Create Admin User

Run this command in the backend directory:

```bash
cd backend
npm run create-admin
```

This creates an admin user with:
- **Email**: `admin@healthcare.com`
- **Password**: `admin123`

⚠️ **Important**: Change this password after first login!

### 2. Login as Admin

1. Go to the login page
2. Use the admin credentials
3. You'll be redirected to the admin dashboard

### 3. Managing Providers

#### Add a Provider
1. Click "Add Provider" button
2. Fill in the required information:
   - Full Name *
   - Email Address *
   - Password *
   - Specialization *
   - License Number *
   - Phone Number (optional)
   - Qualification (optional)
   - Years of Experience (optional)
3. Click "Create Provider"

#### Edit a Provider
1. Click "Edit" on any provider in the list
2. Update the information
3. Optionally reset the password
4. Click "Update Provider"

#### Delete a Provider
1. Click "Delete" on any provider
2. Confirm the deletion
3. All patients assigned to this provider will be unassigned

## API Endpoints

### Admin Authentication
All admin endpoints require:
- Valid JWT token in Authorization header
- User role must be 'admin'

### Dashboard Stats
```http
GET /api/admin/stats
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "data": {
    "totalPatients": 150,
    "totalProviders": 25,
    "patientsWithProviders": 120,
    "patientsWithoutProviders": 30,
    "recentPatients": 10,
    "recentProviders": 2
  }
}
```

### Create Provider
```http
POST /api/admin/providers
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Dr. John Smith",
  "email": "john.smith@hospital.com",
  "password": "secure123",
  "providerInfo": {
    "specialization": "Cardiology",
    "licenseNumber": "MED123456",
    "qualification": "MBBS, MD",
    "yearsOfExperience": 15,
    "contactInfo": {
      "phone": "+1234567890"
    }
  }
}
```

### Update Provider
```http
PUT /api/admin/providers/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Dr. John Smith",
  "email": "john.smith@hospital.com",
  "providerInfo": {
    "specialization": "Cardiology",
    "licenseNumber": "MED123456"
  }
}
```

### Delete Provider
```http
DELETE /api/admin/providers/:id
Authorization: Bearer <token>
```

### Reset Provider Password
```http
PUT /api/admin/providers/:id/reset-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "newPassword": "newSecurePassword123"
}
```

## Security Features

1. **Role-Based Access Control**
   - Only admin users can access admin endpoints
   - Middleware checks user role on every request

2. **Password Security**
   - All passwords are hashed with bcrypt
   - Minimum 6 characters required

3. **Data Validation**
   - Email format validation
   - Required field validation
   - Duplicate email prevention

4. **Audit Trail**
   - All provider creations/updates/deletions are logged
   - Timestamps on all records

## User Roles Summary

| Role | Can Self-Register | Dashboard | Capabilities |
|------|------------------|-----------|--------------|
| Patient | ✅ Yes | `/patient/dashboard` | Track wellness, view reminders |
| Provider | ❌ No (Admin only) | `/provider/dashboard` | View patients, create reminders |
| Admin | ❌ No (Script only) | `/admin/dashboard` | Manage providers, view all data |

## Notes

- Providers can no longer self-register through the public registration page
- Only admins can create provider accounts
- When a provider is deleted, all their assigned patients are automatically unassigned
- Admin users are created via the `create-admin` script only
- The system supports multiple admin users if needed

## Troubleshooting

### Cannot access admin dashboard
- Ensure you're logged in as an admin user
- Check that the JWT token is valid
- Verify the user role is 'admin' in the database

### Provider creation fails
- Check all required fields are filled
- Ensure email is unique
- Verify password is at least 6 characters

### Admin user not created
- Ensure MongoDB is running
- Check database connection in `.env`
- Verify no existing admin with same email
