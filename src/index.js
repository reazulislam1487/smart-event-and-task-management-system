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
