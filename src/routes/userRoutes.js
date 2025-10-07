import express from "express";
import {
  createUser,
  findUserById,
  getAllUsers,
  login,
  userDeleteController,
  userUpdate,
} from "../controllers/userController.js";
import verifyToken from "../middlewares/authMiddleware.js";
const router = express.Router();

export default (userModel) => {
  router.post("/login", (req, res) => login(req, res, userModel));
  router.get("/user/:id", verifyToken, (req, res) =>
    findUserById(req, res, userModel)
  );
  router.get("/users", (req, res) => getAllUsers(req, res, userModel));
  router.post("/users", (req, res) => createUser(req, res, userModel));
  router.put("/users", verifyToken, (req, res) =>
    userUpdate(req, res, userModel)
  );
  router.delete("/delete/:id", verifyToken, (req, res) =>
    userDeleteController(req, res, userModel)
  );
  return router;
};
