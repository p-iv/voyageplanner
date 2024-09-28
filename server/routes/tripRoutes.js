const express = require("express");
const tripController = require("./../controllers/tripController");
const authCheck = require("../middleware/authCheck");
const router = express.Router();

router
  .route("/")
  .get(authCheck, tripController.getAllTrips)
  .post(authCheck, tripController.createTrip);

router.route("/:id").delete(authCheck, tripController.deleteTrip);

module.exports = router;
