const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return (new AppError("No token found", 400))
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized access" ,
      error: err.message
    });
  }
};
