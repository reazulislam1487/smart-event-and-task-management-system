// import express from "express";
// import dotenv from "dotenv";
// // import redis from "redis";
// import router from "./routes/userRoutes.js";
// import Database from "./config/db.js";

// dotenv.config();

// const app = express();
// app.use(express.json());

// // // Redis Connection
// // const redisClient = redis.createClient({
// //   url: `redis://localhost:${process.env.REDIS_PORT}`,
// // });
// // redisClient.on("connect", () => console.log("✅ Redis Connected"));
// // redisClient.connect();

// const config = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// };

// const connection = new Database(config);

// async function startServer() {
//   try {
//     app.use(router);
//     app.get("/", (req, res) => {
//       res.send("Smart Event & Task Management Backend API is running 🚀");
//     });

//     // Server Start
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//   } catch (err) {
//     console.log(err);
//   }
// }
// startServer();

import express from "express";
import dotenv from "dotenv";
import Database from "./config/db.js";
import User from "./models/userModel.js";

import errorHandler from "./middlewares/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// DB Config
const db = new Database({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
// User Model
const userModel = new User(db);

// Routes

app.get("/", (req, res) => res.send("API running..."));

app.use("/", userRoutes(userModel));
// app.post("/login", (req, res) => login(req, res, userModel));
// app.get("/user/:id", verifyToken, (req, res) =>
//   findUserById(req, res, userModel)
// );
// app.get("/users", verifyToken, (req, res) => getAllUsers(req, res, userModel));
// app.post("/users", (req, res) => createUser(req, res, userModel));
// app.put("/users", verifyToken, (req, res) => userUpdate(req, res, userModel));
// app.delete("/delete/:id", verifyToken, (req, res) =>
//   userDeleteController(req, res, userModel)
// );
// Global Error Handler Middleware
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
