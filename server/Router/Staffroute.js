const express = require("express");
const router = express.Router();
const Staff = require("../Model/Staff");
const bcrypt = require("bcrypt");

require("dotenv").config();

router.post("/createadmin", async (req, res) => {
  try {
    const {
      ADMIN_NAME,
      ADMIN_EMAIL,
      ADMIN_ROLE,
      ADMIN_MOBILE,
      ADMIN_PASS,
      ADMIN_CONFIRMPASS,
    } = process.env;

    const name = ADMIN_NAME || req.body.name;
    const email = ADMIN_EMAIL || req.body.email;
    const role = ADMIN_ROLE || req.body.role;
    const mobileNum = ADMIN_MOBILE || req.body.mobileNum;
    const pass = ADMIN_PASS || req.body.pass;
    const confirmPass = ADMIN_CONFIRMPASS || req.body.confirmPass;

    // Check if passwords match
    if (!pass || pass !== confirmPass) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(pass, 10);

    // Create a new admin user
    const newAdmin = new Staff({
      name,
      email,
      role,
      mobileNum,
      pass: hashedPassword,
      confirmPass: hashedPassword, // You can omit this field if not needed after hashing
      isAdminApproved: false, // Set to false by default, can be modified later
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Admin user created successfully",
      admin: {
        name,
        email,
        role,
        mobileNum,
      },
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/staff", async (req, res) => {
  try {
    const { name, email, role, mobileNum, pass, confirmPass } = req.body;

    // Check if passwords match
    if (!pass || pass !== confirmPass) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(pass, 10);

    // Create a new staff member
    const newStaff = new Staff({
      name,
      email,
      role,
      mobileNum,
      pass: hashedPassword,
      confirmPass: hashedPassword, // You can omit this field if not needed after hashing
    });

    // Save the new staff member to the database
    await newStaff.save();

    res
      .status(201)
      .json({ message: "Staff created successfully", staff: newStaff });
  } catch (error) {
    console.error("Error creating staff:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/staff", async (req, res) => {
  try {
    const allStaff = await Staff.find();
    res.status(200).json(allStaff);
  } catch (error) {
    console.error("Error fetching staff data:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/staff/:id", async (req, res) => {
  try {
    const { name, email, role, mobileNum } = req.body;
    const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, {
      name,
      email,
      role,
      mobileNum,
    });
    res
      .status(200)
      .json({ message: "Staff updated successfully", staff: updatedStaff });
  } catch (error) {
    console.error("Error updating staff:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/staff/:id", async (req, res) => {
  try {
    const staffMember = await Staff.findById(req.params.id);
    if (!staffMember) {
      return res.status(404).json({ error: "Staff member not found" });
    }
    res.status(200).json(staffMember);
  } catch (error) {
    console.error("Error fetching staff member:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE route for deleting a staff member
router.delete("/staff/:id", async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (error) {
    console.error("Error deleting staff:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
