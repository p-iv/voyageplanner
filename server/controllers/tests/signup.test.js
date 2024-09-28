const authController = require("../authController");
const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");

jest.mock("../../models/userModel");
jest.mock("jsonwebtoken");

describe("signup", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        confirmPassword: "password123",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  it("should return 400 if user already exists", async () => {
    User.findOne.mockResolvedValue({ email: "test@example.com" });

    await authController.signup(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "User already exists" });
  });

  it("should create a new user and return 201 with token", async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({ _id: "newUserId", ...req.body });
    jwt.sign.mockReturnValue("mockToken");

    await authController.signup(req, res, next);

    expect(User.create).toHaveBeenCalledWith({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      confirmPassword: "password123",
    });

    expect(jwt.sign).toHaveBeenCalledWith(
      { id: "newUserId" },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      token: "mockToken",
      message: "User registered successfully",
      data: {
        user: {
          _id: "newUserId",
          ...req.body,
        },
      },
    });
  });

  it("should return 400 with error message if user creation fails", async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockRejectedValue(new Error("Creation error"));

    await authController.signup(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      message: "Creation error",
    });
  });
});
