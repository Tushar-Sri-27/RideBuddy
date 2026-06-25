const Ride = require("../models/Ride");
const User = require("../models/User");

const RideLocation = require("../models/RideLocation");
const {
  findMatchingRides,
} = require("../services/matchingService");

const { getRouteDetails } = require("../services/mapsService");

const Impact = require("../models/Impact");

const calculateImpact = require("../services/impactService");

// CREATE RIDE
const createRide = async (req, res) => {
  try {
    const {
      sourceAddress,
      sourceLng,
      sourceLat,

      destinationAddress,
      destinationLng,
      destinationLat,

      rideTime,
      seats,
    } = req.body;

    const user = await User.findById(req.user.id);

    // Get route distance & ETA
    const routeData = await getRouteDetails(
      Number(sourceLng),
      Number(sourceLat),
      Number(destinationLng),
      Number(destinationLat)
    );

    const ride = await Ride.create({
      driverId: req.user.id,

      colonyId: user.colonyId,

      source: {
        address: sourceAddress,
        location: {
          type: "Point",
          coordinates: [
            Number(sourceLng),
            Number(sourceLat),
          ],
        },
      },

      destination: {
        address: destinationAddress,
        location: {
          type: "Point",
          coordinates: [
            Number(destinationLng),
            Number(destinationLat),
          ],
        },
      },

      rideTime,

      seats,
      availableSeats: seats,

      routeDistance: Number(
        routeData.distanceKm.toFixed(2)
      ),

      routeDuration: Number(
        routeData.durationMin.toFixed(2)
      ),
    });

    res.status(201).json({
      success: true,
      message: "Ride created successfully",
      data: ride,
    });
  } catch (error) {
    console.error(
      "Create Ride Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// JOIN RIDE
const joinRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    if (ride.availableSeats <= 0) {
      return res.status(400).json({
        success: false,
        message: "No seats available",
      });
    }

    const alreadyJoined = ride.passengers.some(
      passenger =>
        passenger.toString() === req.user.id
    );

    if (alreadyJoined) {
      return res.status(400).json({
        success: false,
        message: "Already joined ride",
      });
    }

    ride.passengers.push(req.user.id);

    ride.availableSeats -= 1;

    await ride.save();

    res.json({
      success: true,
      message: "Ride joined successfully",
      data: ride,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// SEARCH RIDE
const searchRides = async (req, res) => {
  try {
    const rides = await Ride.find({
      status: "scheduled",
    })
      .populate("driverId", "name email")
      .sort({
        rideTime: 1,
      });

    res.json({
      success: true,
      count: rides.length,
      data: rides,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET NEARBY RIDES
const getNearbyRides = async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;

    const rides = await Ride.find({
      "source.location": {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [
              Number(lng),
              Number(lat),
            ],
          },
          $maxDistance: Number(radius),
        },
      },

      status: "scheduled",
    }).populate(
      "driverId",
      "name email"
    );

    res.status(200).json({
      success: true,
      count: rides.length,
      data: rides,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//SMART RIDE
const smartMatchRide = async (req, res) => {
    console.log(req.query);
  try {
    const {
      lat,
      lng,
      destinationLat,
      destinationLng,
      rideTime,
    } = req.query;

    const user = await User.findById(req.user.id);

    const rides =
      await findMatchingRides({
        userColonyId: user.colonyId,
        lat,
        lng,
        destinationLat,
        destinationLng,
        rideTime,
      });

    res.status(200).json({
      success: true,
      count: rides.length,
      data: rides,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }

    if (!rideTime) {
        throw new Error("rideTime is required");
    }

    const searchTime = new Date(rideTime);

    if (isNaN(searchTime.getTime())) {
        throw new Error("Invalid rideTime format");
    }
};

// START RIDE
const startRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    ride.status = "started";
    await ride.save();

    res.json({
      success: true,
      message: "Ride started",
      data: ride,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// COMPLETE RIDE
const completeRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    ride.status = "completed";
    await ride.save();

    // Total passengers
    const passengerCount =
      ride.passengers.length > 0
        ? ride.passengers.length
        : 1;

    // Calculate impact
    const impactData = calculateImpact(
      ride.routeDistance,
      passengerCount
    );

    // Save impact
    const impact = await Impact.create({
      rideId: ride._id,
      fuelSaved: impactData.fuelSaved,
      co2Reduced: impactData.co2Reduced,
      moneySaved: impactData.moneySaved,
    });

    res.json({
      success: true,
      message: "Ride completed",
      data: ride,
      impact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRideLocation = async (
  req,
  res
) => {
  try {
    const location =
      await RideLocation.findOne({
        rideId: req.params.rideId,
      });

    if (!location) {
      return res.status(404).json({
        success: false,
        message:
          "No location found",
      });
    }

    res.json({
      success: true,
      data: location,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getRideImpact = async (req, res) => {
  try {
    const impact = await Impact.findOne({
      rideId: req.params.rideId,
    });

    if (!impact) {
      return res.status(404).json({
        success: false,
        message: "Impact not found",
      });
    }

    res.json({
      success: true,
      data: impact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createRide,
  joinRide,
  searchRides,
  getNearbyRides,
  smartMatchRide,
  startRide,
  completeRide,
  getRideImpact,
  getRideLocation,
};