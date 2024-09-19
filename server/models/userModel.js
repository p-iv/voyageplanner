const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "User email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "User password is required"],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm password is required"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
