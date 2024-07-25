const express = require("express");
const googleMapsApiController = require("./../controllers/googleMapsApiController");

const router = express.Router();
router.route("/destinations").get(googleMapsApiController.getAllDestinations);
router.route("/destination").get(googleMapsApiController.getDestination);
router.route("/location").get(googleMapsApiController.getLocation);
router.route("/places").get(googleMapsApiController.getPlaces);
router.route("/place").get(googleMapsApiController.getPlace);

module.exports = router;
