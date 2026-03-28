# 📦 Full Stack Task Manager App

A simple full stack web application built using React.js, Node.js, and MongoDB.
This project demonstrates authentication, dashboard functionality, and backend integration.

---

## 🚀 Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS / DaisyUI

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

---

## 📌 Features

* User Login (Email & Password)
* Dashboard with user data
* Task Management (Pending, In Progress, Completed)
* Update task status
* Logout functionality (optional)
* Deployed frontend & backend

---

## 📁 Project Structure

project-root/
│
├── frontend/   # React app
├── backend/    # Node.js API
└── README.md

---

## ⚙️ Setup Instructions (Run Locally)

### 1. Clone the repository

git clone <your-repo-url>
cd project-root

---

### 2. Setup Backend

cd backend
npm install

Create a `.env` file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend:

npm start

---

### 3. Setup Frontend

cd ../frontend
npm install

Create a `.env` file:

VITE_BACKEND_API_URL=http://localhost:5000

Run frontend:

npm run dev

---

## 🌐 Live Demo

Frontend (Vercel): <your-frontend-url>

Backend (AWS / Render): <your-backend-url>

---

## 📡 API Endpoints

POST /login → User login
GET /tasks → Get all tasks
POST /tasks → Create task
PUT /tasks/:id → Update task

---

## 🧠 Notes

* Backend uses MongoDB Atlas
* Environment variables required
* CORS enabled for frontend-backend communication

---

## ✨ Future Improvements

* JWT Authentication
* Protected Routes
* Delete Task
* Better UI/UX
* Loading & error handling

---

## 👨‍💻 Author

Sarthak

---

## 📜 License

This project is for assessment and learning purposes.
