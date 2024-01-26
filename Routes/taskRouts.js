const express = require("express");

const {
  addNewTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require("../Controller/TaskController");

const router = express.Router();

router.post("/add-task/:user_id", addNewTask);
router.get("/get-tasks/:user_id", getAllTasks);
router.put("/update-task/:id", updateTask);
router.delete("/delete-task/:taskId", deleteTask);

module.exports = router;
