import express from "express";
import { createTask } from "../controllers/taskController.js";

const router = express.Router();
export default (taskModel) => {
  router.post("/post", (req, res) => createTask(req, res, taskModel));

  return router;
};
