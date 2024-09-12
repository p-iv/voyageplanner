const Trip = require("./../models/tripModel");

exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find();

    res.status(200).json({
      status: "success",
      results: trips.length,
      data: {
        trips,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "No trips found",
    });
  }
};

exports.createTrip = async (req, res) => {
  try {
    const newTrip = await Trip.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        trip: newTrip,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent",
      error: err.message,
    });
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Trip deleted successfully",
      data: {
        trip,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Trip not found",
      error: err.message,
    });
  }
};
