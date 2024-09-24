const axios = require("axios");

// const API_KEY = process.env.API_KEY;
const API_KEY = "AIzaSyAUgy97d-8V-p70KKlbyVR3MFQxUnqoGGI";
exports.getAllDestinations = async (req, res) => {
  const input = req.query.input;

  try {
    response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=(cities)&key=${API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to fetch destinations" });
  }
};

exports.getDestination = async (req, res) => {
  const id = req.query.id;
  try {
    response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=${API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to fetch destination" });
  }
};

exports.getLocation = async (req, res) => {
  const id = req.query.id;
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=geometry&key=${API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to fetch location" });
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
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat}%2C${location.lng}&radius=10000&type=${type}&key=${API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to fetch places" });
  }
};

exports.getPlace = async (req, res) => {
  const id = req.query.id;
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=${API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to fetch place" });
  }
};
