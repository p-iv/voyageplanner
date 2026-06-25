const axios = require("axios");

const API_KEY = process.env.GOOGLEMAPS_API_KEY;
const API_BASE_URL = "https://maps.googleapis.com/maps/api/place"

exports.getAllDestinations = async (req, res) => {
  const input = req.query.input;

  try {
    response = await axios.get(
      `${API_BASE_URL}/autocomplete/json?input=${input}&types=(cities)&key=${API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "failed to get destination list",
      error: err.message,
    });
  }
};

exports.getDestination = async (req, res) => {
  const id = req.query.id;

  try {
    response = await axios.get(
      `${API_BASE_URL}/details/json?place_id=${id}&key=${API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "failed to get destination object",
      error: err.message,
    });
  }
};

exports.getLocation = async (req, res) => {
  const id = req.query.id;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/details/json?place_id=${id}&fields=geometry&key=${API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "failed to get location",
      error: err.message,
    });
  }
};

exports.getPlaces = async (req, res) => {
  const location = {
    lat: req.query.lat,
    lng: req.query.lng,
  };
  const type = req.query.type;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/nearbysearch/json?location=${location.lat}%2C${location.lng}&radius=10000&type=${type}&key=${API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "failed to get place list",
      error: err.message,
    });
  }
};

exports.getPlace = async (req, res) => {
  const id = req.query.id;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/details/json?place_id=${id}&key=${API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "failed to get place object",
      error: err.message,
    });
  }
};
