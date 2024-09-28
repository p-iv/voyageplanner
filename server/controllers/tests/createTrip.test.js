const tripController = require("../tripController"); // Adjust the path as necessary
const Trip = require("../../models/tripModel"); // Adjust the path as necessary

jest.mock("../../models/tripModel"); // Mock the Trip model

describe("createTrip", () => {
  let req, res;

  beforeEach(() => {
    req = {
      user: { id: "userId123" }, // Mock user ID from authenticated request
      body: {
        destinations: ["New York", "Los Angeles"],
        name: "USA Trip",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should create a new trip and return 201 with trip data", async () => {
    const mockTrip = {
      _id: "tripId123",
      userId: "userId123",
      destinations: ["New York", "Los Angeles"],
      name: "USA Trip",
    };

    Trip.create.mockResolvedValue(mockTrip);

    await tripController.createTrip(req, res);

    expect(Trip.create).toHaveBeenCalledWith({
      userId: "userId123",
      destinations: ["New York", "Los Angeles"],
      name: "USA Trip",
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: {
        trip: mockTrip,
      },
    });
  });

  it("should return 400 if an error occurs during trip creation", async () => {
    const mockError = new Error("Invalid data");
    Trip.create.mockRejectedValue(mockError);

    await tripController.createTrip(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      message: "Invalid data sent",
      error: mockError.message,
    });
  });
});
