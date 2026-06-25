const express = require("express");

const {
  createRide,
  joinRide,
  searchRides,
  getNearbyRides,
  smartMatchRide,
  startRide,
  completeRide,
  getRideLocation,
} = require("../controllers/rideController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  getRouteDetails,
} = require("../services/mapsService");

const router = express.Router();

router.put("/:id/start", protect, startRide);

router.put("/:id/complete", protect, completeRide);

// Search rides
router.get("/search", protect, searchRides);

router.get(
  "/location/:rideId",
  protect,
  getRideLocation
);

// Nearby rides
router.get("/nearby", protect, getNearbyRides);

// Smart Match
router.get(
  "/smart-match",
  protect,
  smartMatchRide
);

// Create ride
router.post("/", protect, createRide);

// Join ride
router.post("/:id/join", protect, joinRide);

// ORS Test Route
router.get("/test-route", async (req, res) => {
  try {
    const result = await getRouteDetails(
      81.6296,
      21.2514,
      81.6500,
      21.2700
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;