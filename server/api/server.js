const express = require("express");
const axios = require("axios");
const app = express();

const API_KEY = "AIzaSyAUgy97d-8V-p70KKlbyVR3MFQxUnqoGGI";

app.get("/", (req, res) => res.send("Express on Vercel"));

app.get("/autocomplete", async (req, res) => {
  const input = "wa";
  try {
    response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=(cities)&key=${API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
