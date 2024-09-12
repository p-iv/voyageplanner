const express = require("express");
const tripController = require("./../controllers/tripController");
const router = express.Router();

router
  .route("/")
  .get(tripController.getAllTrips)
  .post(tripController.createTrip);

router.route("/:id").delete(tripController.deleteTrip);

module.exports = router;
