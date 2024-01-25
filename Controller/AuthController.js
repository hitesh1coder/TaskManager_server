const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { connection } = require("../db/dbConnect");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);

  connection.query(
    "INSERT INTO todo_project.user (name,email, password) VALUES (?, ?,?)",
    [name, email, encryptedPassword],
    (err, results) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          // Duplicate entry error (unique constraint violation)
          return res
            .status(409)
            .json({ error: "Email address is already registered" });
        } else {
          console.error("Error registering user:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      } else {
        res.status(201).json({ message: "User registered successfully" });
      }
    }
  );
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  connection.query(
    "SELECT * FROM todo_project.user WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.error("Error during login:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else if (results.length > 0) {
        const match = await bcrypt.compare(password, results[0].password);

        if (match) {
          const token = jwt.sign(
            { email: results[0].email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          res.json({ token, user: results[0] });
        } else {
          res.status(401).json({ error: "Invalid credentials" });
        }
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    }
  );
};

module.exports = { registerUser, loginUser };
