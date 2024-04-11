const express = require("express");
const router = express.Router();
const Contact = require("../Model/Contact");
const nodemailer = require("nodemailer");

router.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Basic validation
  if (!name || !email || !phone || !message) {
    return res.status(400).send("Please fill all fields correctly.");
  }

  try {
    // Saving to MongoDB
    const newContact = new Contact({
      name,
      email,
      phone, // Updated field name
      message,
    });

    await newContact.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hariharan23052001@gmail.com",
        pass: "kfby qetq vtet dyfv",
      },
    });

    // Email content
    const mailOptions = {
      from: email,
      to: "your-email@example.com",
      subject: `Contact Form Submission - ${name}`, // Updated subject line
      text: `Name: ${name}\nEmail: ${email}\nPhone Number: ${phone}\nMessage: ${message}`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        res.status(500).send("Error sending email");
      } else {
        console.log("Email sent:", info.response);
        res.status(200).send("Email sent successfully");
      }
    });
  } catch (error) {
    console.error("Error:", error.toString());
    return res.status(500).send("Message sending failed. Please try again.");
  }
});

module.exports = router;
