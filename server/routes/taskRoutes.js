import express from "express";
import {
  addTask,
  deleteTask,
  getAllTasks,
  getFilteredTasks,
  getTask,
  updateTask,
} from "../controllers/taskController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

router.route("/").get(getAllTasks).post(addTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);
router.route("/filter").post(getFilteredTasks);

export default router;
