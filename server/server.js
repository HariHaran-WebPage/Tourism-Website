const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const cors = require("cors"); // Import the cors package
const Register = require("./Router/Regroute");
const Login = require("./Router/Loginroute");
const bodyParser = require("body-parser");
const Contact = require("./Router/Contactroute");
const Staff = require("./Router/Staffroute");

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.use("/", Register);
app.use("/", Login);
app.use("/", Contact);
app.use("/", Staff);

mongoose
  .connect("mongodb://0.0.0.0:27017", {
    dbName: "MEEZAR",
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
