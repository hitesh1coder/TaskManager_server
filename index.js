const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const { connectDb, connection } = require("./db/dbConnect");
const authRoutes = require("./Routes/authRoutes");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

connectDb();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Routes
app.use("/api", authRoutes);

app.listen(port, () => {
  console.log("Server is running on port 5000");
});
