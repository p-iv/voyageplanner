const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

const API_KEY = "AIzaSyAUgy97d-8V-p70KKlbyVR3MFQxUnqoGGI";

app.get("/", (req, res) => res.send("Express on Vercel"));

app.get("/destinations", async (req, res) => {
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
});

app.get("/destination", async (req, res) => {
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
});

app.get("/location", async (req, res) => {
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
});

app.get("/places", async (req, res) => {
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
});

app.get("/place", async (req, res) => {
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
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
