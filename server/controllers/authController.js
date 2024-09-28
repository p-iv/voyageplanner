const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

<<<<<<< HEAD
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
=======
    const token = jwt.sign(
      { id: newUser._id },
      "housedogtreecatoneserversecretfootball",
      {
        expiresIn: "90d",
      }
    );
>>>>>>> d642b13c1109b281b0e799c627e62ba7e12996c9

    res.status(200).json({
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
<<<<<<< HEAD
=======

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id },
    "housedogtreecatoneserversecretfootball",
    {
      expiresIn: "90d",
    }
  );

  res.json({ token });
};
>>>>>>> d642b13c1109b281b0e799c627e62ba7e12996c9
