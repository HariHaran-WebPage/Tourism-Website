const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  mobileNum: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  confirmPass: {
    type: String,
    required: true,
  },
  // You can add more fields as needed
});

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
