const { connection } = require("../db/dbConnect");

const addNewTask = async (req, res) => {
  const { title, description } = req.body;
  const user_id = req.params.user_id;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required" });
  }
  if (!user_id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const sql =
    "INSERT INTO todo_project.task_data (title, description, user_id) VALUES (?, ?, ?)";
  let value = [title, description, user_id];
  connection.query(sql, value, (err, results) => {
    if (err) {
      console.error("Error adding new task:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.status(201).json({
        message: "Task added successfully",
      });
    }
  });
};

const getAllTasks = async (req, res) => {
  const user_id = req.params.user_id;
  const sql = "SELECT * FROM todo_project.task_data WHERE user_id = ?";
  connection.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error("Error retrieving tasks:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
};

const updateTask = async (req, res) => {
  const { title, description, isCompleted } = req.body;
  const id = req.params.id;
  const sql =
    "UPDATE todo_project.task_data SET title = ?, description =?, isCompleted = ? WHERE id = ? ";
  let value = [title, description, isCompleted, id];
  connection.query(sql, value, (err, results) => {
    if (err) {
      console.error("Error updating task:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.status(200).json({
        message: "Task updated successfully",
      });
    }
  });
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const sql = "DELETE FROM todo_project.task_data WHERE id = ?";
  let value = [taskId];
  connection.query(sql, value, (err, results) => {
    if (err) {
      console.error("Error deleting task:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.status(200).json({
        message: "Task deleted successfully",
      });
    }
  });
};

module.exports = { addNewTask, getAllTasks, updateTask, deleteTask };
