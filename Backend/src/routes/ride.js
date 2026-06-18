const express = require("express");

const {
  createRide,
  joinRide,
  searchRides,
  getNearbyRides,
  smartMatchRide,
} = require("../controllers/rideController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Search rides
router.get("/search", protect, searchRides);

// Nearby rides
router.get("/nearby", protect, getNearbyRides);


// Create ride
router.post("/", protect, createRide);

//smartRide
router.get(
  "/smart-match",
  protect,
  smartMatchRide
);

// Join ride
router.post("/:id/join", protect, joinRide);

module.exports = router;