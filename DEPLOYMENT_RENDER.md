# Deploying Backend to Render

This guide outlines the steps to deploy the Node.js backend of the Healthcare Portal to [Render.com](https://render.com).

## 1. Prerequisites
*   A [Render](https://render.com) account.
*   Your project pushed to a GitHub repository.
*   A MongoDB connection string (e.g., from MongoDB Atlas) that allows access from anywhere (`0.0.0.0/0`).

## 2. Create a New Web Service
1.  Log in to the Render Dashboard.
2.  Click **New +** and select **Web Service**.
3.  Connect your GitHub repository (`flux_hacks`).

## 3. Configure the Service
Fill in the details as follows:

*   **Name**: `flux-hacks-backend` (or your preferred name)
*   **Region**: Select the one closest to your users (e.g., Singapore, Frankfurt).
*   **Branch**: `main`
*   **Root Directory**: `backend` (⚠️ **CRITICAL**: This tells Render to look inside the backend folder).
*   **Runtime**: `Node`
*   **Build Command**: `npm install`
*   **Start Command**: `npm start` (This runs `node src/server.js`).

## 4. Environment Variables
Scroll down to the **Environment Variables** section and add the following keys from your local `.env`:

| Key | Value |
| :--- | :--- |
| `MONGODB_URI` | Your production MongoDB connection string. |
| `JWT_SECRET` | A strong, secure secret key (use a long random string). |
| `NODE_ENV` | `production` |

*Note: You do not need to set `PORT`. Render automatically sets this and your code should listen on `process.env.PORT`.*

## 5. Deploy
1.  Click **Create Web Service**.
2.  Render will verify the settings, install dependencies, and start your server.
3.  Watch the deployment logs. Once you see "Server running on port...", your backend is live!

## 6. Post-Deployment (Frontend Connection)
Once deployed, Render will give you a URL (e.g., `https://flux-hacks-backend.onrender.com`).
You must update your **Frontend** configuration to point to this new URL.

1.  Go to your `client` folder.
2.  Update the `.env` (or Vercel/Netlify environment variables) `VITE_API_URL` to your new Render URL:
    ```
    VITE_API_URL=https://flux-hacks-backend.onrender.com/api
    ```
