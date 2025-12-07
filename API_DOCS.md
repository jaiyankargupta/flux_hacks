# API Documentation

This document outlines the available REST API endpoints for the Healthcare Portal.

**Base URL**: `/api` (e.g., `http://localhost:5000/api`)

## 🔐 Authentication (`/auth`)

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Register a new user (Patient/Provider/Admin roles supported during dev/setup?) | Public |
| `POST` | `/login` | Authenticate user and receive JWT | Public |
| `GET` | `/me` | Get current user profile details | Authenticated |
| `PUT` | `/profile` | Update user profile information | Authenticated |
| `PUT` | `/basic-info` | Update basic info (name, etc.) | Authenticated |

## 🛡 Admin Routes (`/admin`)
*Requires `Bearer Token` with `role: admin`*

### Dashboard & Stats
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/stats` | Get dashboard statistics (counts for patients, providers, etc.) |

### Provider Management
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/providers` | Get list of all healthcare providers |
| `POST` | `/providers` | Create a new healthcare provider |
| `GET` | `/providers/:id` | Get details of a specific provider |
| `PUT` | `/providers/:id` | Update provider details |
| `DELETE` | `/providers/:id` | Delete a provider |
| `PUT` | `/providers/:id/reset-password` | Reset a provider's password |

### Patient Management
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/patients` | Get list of all patients |

## 🩺 Provider Routes (`/provider`)
*Requires `Bearer Token` with `role: provider`*

### Patient Management
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/patients` | Get list of assigned patients |
| `GET` | `/patients/:id` | Get specific patient details |
| `POST` | `/patients/:id/reminders` | Create a reminder for a patient |

## 👤 Patient Routes (`/patient`)
*Requires `Bearer Token` with `role: patient`*

### Dashboard & Goals
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/dashboard` | Get patient dashboard data |
| `POST` | `/goals` | Update health goals |
| `GET` | `/goals/history` | Get history of goals |

### Reminders
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/reminders` | Get daily reminders |
| `PUT` | `/reminders/:id/complete` | Mark a reminder as completed |

### Provider Interaction
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/providers` | Get list of all available providers |
| `GET` | `/provider` | Get currently assigned provider |
| `POST` | `/provider/:providerId` | Assign a specific provider to self |
| `DELETE` | `/provider` | Unassign current provider |

## Error Handling
The API returns errors in the following format:
```json
{
  "status": "fail" | "error",
  "message": "Error description",
  "errors": [...] // Optional validation errors
}
```
