const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../Model/Register");

router.post("/login", async (req, res) => {
  const { mobileNumber, password } = req.body;

  // Basic validation
  if (!mobileNumber || !password) {
    return res.status(400).send("Please provide mobile number and password.");
  }

  try {
    // Check if user exists in the database based on mobile number
    const user = await User.findOne({ mobileNumber });

    if (!user) {
      return res.status(404).send("User not found. Please register.");
    }

    // Validate password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send("Incorrect mobile number or password.");
    }

    // If the mobile number and password are correct, user is authenticated
    // Send the user's role along with the login response
    res.status(200).json({ message: "Login successful!", role: user.role });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Login failed. Please try again.");
  }
});

module.exports = router;
