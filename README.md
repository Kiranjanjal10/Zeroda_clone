# Zerodha Clone Setup & Run Guide

Follow these step-by-step instructions to open and run this project natively on your machine using Visual Studio Code (VSCode).

## Prerequisites
Before you begin, ensure you have the following installed on your machine:
1. **Node.js**: [Download and install](https://nodejs.org/) (Version 18 or higher is recommended)
2. **MongoDB**: [Download and install](https://www.mongodb.com/try/download/community) (Make sure the MongoDB service is running locally)
3. **VSCode**: [Download and install](https://code.visualstudio.com/)

---

## Step 1: Open the Project in VSCode
1. Open VSCode.
2. Click on **File > Open Folder...** (or press `Ctrl+K Ctrl+O`).
3. Navigate to the project directory: `C:\Users\kiran\.gemini\antigravity-ide\scratch\zerodha-clone`.
4. Click **Select Folder**.

---

## Step 2: Install Dependencies
You need to install the required Node modules for the project. The project is set up with a single command to install everything.

1. Open the integrated terminal in VSCode by clicking **Terminal > New Terminal** (or pressing `` Ctrl+` ``).
2. You should automatically be in the `zerodha-clone` directory.
3. Run the following command to install dependencies for both the frontend and backend simultaneously:
   ```bash
   npm install
   ```

---

## Step 3: Configure Environment Variables
You need to set up your backend secrets.

1. In the VSCode file explorer on the left, open the `server` folder.
2. Look for a file named `.env`. If it doesn't exist, create a new file named `.env` inside the `server` folder.
3. Add the following text to the `.env` file and save it:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/zerodha-clone
   JWT_SECRET=your_super_secret_jwt_key_here
   ```

---

## Step 4: Run the Application
The project is configured to run both the frontend and backend servers at the same time using a single command.

1. In your VSCode terminal (make sure you are in the root `zerodha-clone` directory), run:
   ```bash
   npm run dev
   ```
2. You will see two logs start up:
   - **The Backend (Node/Express)**: Will show `Server running on port 5000` and `MongoDB Connected: localhost`.
   - **The Frontend (Vite/React)**: Will show `VITE v5.x.x ready` and give you a Local URL.

---

## Step 5: View the App in your Browser
1. Open your favorite web browser (Chrome, Edge, etc.).
2. Navigate to **[http://localhost:5173](http://localhost:5173)**.
3. You should see your Zerodha Clone running perfectly!

> **Admin Access:** If you need to log into the Admin portal, use the credentials you set up, or register a new user and change their role to `admin` in your local MongoDB database using a tool like MongoDB Compass.
