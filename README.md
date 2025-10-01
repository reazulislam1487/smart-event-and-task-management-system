# Smart Event & Task Management System (Backend)

## 📌 Project Overview

Smart Event & Task Management System হলো একটি **RESTful backend API** যা ব্যবহারকারীদের **Task** ও **Event** কার্যকরভাবে ম্যানেজ করার সুযোগ দেয়।

🎯 **Goal:** বাস্তব Backend development skill প্রদর্শন করা এবং একটি **Job-Ready Portfolio Project** তৈরি করা।

---

## 🚀 Features

- User Authentication & Authorization (JWT + bcrypt)
- Role-Based Access Control (Admin/User)
- Task & Event CRUD Operations
- Relational Database Design (MySQL)
- Redis Caching
- Pagination, Filtering, Sorting
- Dashboard & Analytics
- Activity Tracking
- (Optional) Email Notifications

---

## 🛠 Tech Stack

- **Backend:** Node.js + Express.js
- **Database:** MySQL
- **Caching:** Redis
- **Authentication:** JWT + bcrypt
- **Version Control:** Git & GitHub
- **Testing:** Postman / Insomnia

---

## 📊 Database Schema

### Users

| Column     | Type                 | Note                      |
| ---------- | -------------------- | ------------------------- |
| id         | INT, PK, AI          |                           |
| name       | VARCHAR(255)         |                           |
| email      | VARCHAR(255), UNIQUE |                           |
| password   | VARCHAR(255)         | hashed                    |
| role       | ENUM('user','admin') | default 'user'            |
| created_at | DATETIME             | default CURRENT_TIMESTAMP |

### Tasks

| Column      | Type                                 | Note                        |
| ----------- | ------------------------------------ | --------------------------- |
| id          | INT, PK, AI                          |                             |
| title       | VARCHAR(255)                         |                             |
| description | TEXT                                 |                             |
| status      | ENUM('pending','in-progress','done') | default 'pending'           |
| priority    | ENUM('low','medium','high')          | default 'medium'            |
| due_date    | DATETIME                             |                             |
| user_id     | INT, FK → Users.id                   |                             |
| created_at  | DATETIME                             | default CURRENT_TIMESTAMP   |
| updated_at  | DATETIME                             | on update CURRENT_TIMESTAMP |

### Events

| Column      | Type               | Note                      |
| ----------- | ------------------ | ------------------------- |
| id          | INT, PK, AI        |                           |
| title       | VARCHAR(255)       |                           |
| description | TEXT               |                           |
| location    | VARCHAR(255)       |                           |
| start_time  | DATETIME           |                           |
| end_time    | DATETIME           |                           |
| created_by  | INT, FK → Users.id |                           |
| created_at  | DATETIME           | default CURRENT_TIMESTAMP |

### Event Participants

| Column    | Type                | Note                      |
| --------- | ------------------- | ------------------------- |
| id        | INT, PK             |                           |
| event_id  | INT, FK → Events.id |                           |
| user_id   | INT, FK → Users.id  |                           |
| joined_at | DATETIME            | default CURRENT_TIMESTAMP |

---

## 📌 API Endpoints

### Authentication

- `POST /api/register` – Register user
- `POST /api/login` – Login user
- `POST /api/token/refresh` – Refresh JWT (optional)

### Users

- `GET /api/users` – List users (admin only)
- `GET /api/users/:id` – User profile
- `PUT /api/users/:id` – Update user
- `DELETE /api/users/:id` – Delete user (admin only)

### Tasks

- `POST /api/tasks` – Create task
- `GET /api/tasks` – List tasks (with filters & pagination)
- `GET /api/tasks/:id` – Task details
- `PUT /api/tasks/:id` – Update task
- `DELETE /api/tasks/:id` – Delete task

### Events

- `POST /api/events` – Create event
- `GET /api/events` – List events (filters, pagination, sorting)
- `GET /api/events/:id` – Event details
- `PUT /api/events/:id` – Update event
- `DELETE /api/events/:id` – Delete event
- `POST /api/events/:id/join` – Join event

### Dashboard

- `GET /api/dashboard` – Task summary & Upcoming events

---

## ✅ Success Criteria

- Full REST API working
- Authentication + RBAC
- MySQL database designed properly
- Redis caching added
- Pagination, filtering & sorting functional
- Tested with Postman
- Deployable on Render/Heroku

---

## 📂 Project Structure

---

smart-event-task-backend/
│── node_modules/
│── src/
│ ├── config/
│ │ ├── db.js
│ │ ├── redis.js
│ ├── routes/
│ │ ├── authRoutes.js
│ │ ├── taskRoutes.js
│ │ ├── eventRoutes.js
│ │ ├── userRoutes.js
│ ├── controllers/
│ │ ├── authController.js
│ │ ├── taskController.js
│ │ ├── eventController.js
│ │ ├── userController.js
│ ├── middlewares/
│ │ ├── authMiddleware.js
│ ├── models/
│ │ ├── userModel.js
│ │ ├── taskModel.js
│ │ ├── eventModel.js
│ │ ├── participantModel.js
│ ├── index.js
│── .env
│── package.json
│── README.md

---

---

## ▶️ Installation & Run

```bash
# Clone repo
git clone https://github.com/your-username/smart-event-task-backend.git
cd smart-event-task-backend

# Install dependencies
npm install

# Setup .env file
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=smart_event_db
JWT_SECRET=your_jwt_secret
REDIS_PORT=6379

# Run server
npm start
```

```
📌 Why This Project is Impressive

শুধু CRUD না → Full Backend Skillset

Implements Security (JWT + RBAC)

Uses Relational DB (MySQL) + Redis Caching

Has Analytics & Dashboard

Perfect Portfolio-Ready Project
```

---

# 📂 Starter Code (index.js + DB + Redis setup)

```js
// index.js
import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import redis from "redis";

dotenv.config();

const app = express();
app.use(express.json());

// MySQL Connection
const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
console.log("✅ MySQL Connected");

// Redis Connection
const redisClient = redis.createClient({
  url: `redis://localhost:${process.env.REDIS_PORT}`,
});
redisClient.on("connect", () => console.log("✅ Redis Connected"));
redisClient.connect();

// Routes
app.get("/", (req, res) => {
  res.send("Smart Event & Task Management Backend API is running 🚀");
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
```
