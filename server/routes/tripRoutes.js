const express = require("express");
const tripController = require("./../controllers/tripController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router
  .route("/")
  .get(authMiddleware, tripController.getAllTrips)
  .post(authMiddleware, tripController.createTrip);

router.route("/:id").delete(authMiddleware, tripController.deleteTrip);

module.exports = router;
