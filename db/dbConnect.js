const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kumarHK@1002",
  database: "todo_project",
});

const connectDb = () => {
  connection.connect((err) => {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    } else {
      console.log("database connected");
    }
  });
};

module.exports = { connection, connectDb };
