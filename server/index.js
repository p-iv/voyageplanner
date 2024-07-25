const express = require("express");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = "AIzaSyAUgy97d-8V-p70KKlbyVR3MFQxUnqoGGI";

const getAllDestinations = async (req, res) => {
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

const getDestination = async (req, res) => {
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

const getLocation = async (req, res) => {
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

const getPlaces = async (req, res) => {
  const location = {
    lat: req.query.lat,
    lng: req.query.lng,
  };
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat}%2C${location.lng}&radius=10000&type=tourist_attraction&key=${API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to fetch places" });
  }
};

const getPlace = async (req, res) => {
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

const createTrip = (req, res) => {
  const newTrip = req.body;

  fs.readFile(`${__dirname}/data/tripData.json`, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read data" });
    }

    let existingTrips = [];

    try {
      existingTrips = JSON.parse(data);
      if (!Array.isArray(existingTrips)) existingTrips = [];
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to parse data" });
    }

    existingTrips.push(newTrip);

    fs.writeFile(
      `${__dirname}/data/tripData.json`,
      JSON.stringify(existingTrips, null, 2),
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to write data" });
        }

        res.status(201).json({
          status: "success",
          data: {
            tripData: existingTrips,
          },
        });
      }
    );
  });
};

app.get("/", (req, res) => res.send("Express on Vercel"));

app.route("/destinations").get(getAllDestinations);
app.route("/destination").get(getDestination);
app.route("/location").get(getLocation);
app.route("/places").get(getPlaces);
app.route("/place").get(getPlace);
app.route("/trips").post(createTrip);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
