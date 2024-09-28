const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const newUser = await User.create({
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success",
      token,
      message: "User registered successfully",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please enter a valid email and password", 400));
  }
  try {
    const user = await User.findOne({ email: email }).select("+password");
    const correct = await user.correctPassword(password, user.password);

    if (!user || !correct) {
      return next(new AppError("Invalid email or password", 401));
    }

    const token = signToken(user._id);

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {}
};
