const mongoose = require("mongoose");

const attractionLocation = new mongoose.Schema({
  lat: {
    type: Number,
    required: [true, "Attraction location must have a latitude"],
  },
  lng: {
    type: Number,
    required: [true, "Attraction location must have a longitude"],
  },
});

const attractionGeometry = new mongoose.Schema({
  location: {
    type: attractionLocation,
    required: [true, "An attraction must have a geometry"],
  },
});

const attractionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "An attraction must have a name"],
  },
  geometry: {
    type: attractionGeometry,
    required: [true, "An attraction must have a location"],
  },
});

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A destination must have a name"],
  },
  attractions: {
    type: [attractionSchema],
    required: [true, "A destination must have attractions"],
  },
});

const tripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: {
    type: String,
    required: [true, "A trip must have a name"],
    uppercase: true,
  },
  destinations: {
    type: [destinationSchema],
    required: [true, "A trip must have destinations"],
  },
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
