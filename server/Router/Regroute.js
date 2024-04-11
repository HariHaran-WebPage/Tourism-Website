const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../Model/Register");

// POST route for user registration
router.post("/register", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    mobileNumber,
    password,
    confirmPassword,
  } = req.body;

  // Basic validation
  if (
    !firstName ||
    !lastName ||
    !email ||
    !mobileNumber ||
    !password ||
    password !== confirmPassword
  ) {
    return res.status(400).send("Please fill all fields correctly.");
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { mobileNumber }],
    });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).send("User with this email already exists.");
      } else {
        return res
          .status(400)
          .send("User with this mobile number already exists.");
      }
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({
      firstName,
      lastName,
      email,
      mobileNumber,
      password: hashedPassword,
    });
    // Save the user to the database
    await newUser.save();
    res.status(201).send("Registration successful!");
  } catch (error) {
    res.status(500).send("Registration failed. Please try again.");
  }
});

router.get("/users", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).send("User not found.");
    }
    res.status(200).send("User deleted successfully.");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Error deleting user.");
  }
});

router.put("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, email, mobileNumber } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email, mobileNumber },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found.");
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Error updating user.");
  }
});

module.exports = router;
