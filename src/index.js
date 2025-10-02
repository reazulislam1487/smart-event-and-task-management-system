import express from "express";
import dotenv from "dotenv";
// import redis from "redis";
import router from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// // Redis Connection
// const redisClient = redis.createClient({
//   url: `redis://localhost:${process.env.REDIS_PORT}`,
// });
// redisClient.on("connect", () => console.log("✅ Redis Connected"));
// redisClient.connect();

async function startServer() {
  try {
    app.use(router);
    app.get("/", (req, res) => {
      res.send("Smart Event & Task Management Backend API is running 🚀");
    });

    // Server Start
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
}
startServer();
