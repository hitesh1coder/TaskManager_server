const express = require("express");

const {
  addNewTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require("../Controller/TaskController");

const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add-task/:user_id", verifyToken, addNewTask);
router.get("/get-tasks/:user_id", getAllTasks);
router.put("/update-task/:id", verifyToken, updateTask);
router.delete("/delete-task/:taskId", verifyToken, deleteTask);

module.exports = router;
