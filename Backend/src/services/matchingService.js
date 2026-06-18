const Ride = require("../models/Ride");
const calculateMatchScore = require("./scoringService");

const findMatchingRides = async ({
  userColonyId,
  lat,
  lng,
  destinationLat,
  destinationLng,
  rideTime,
}) => {
  const searchTime = new Date(rideTime);

  const minTime = new Date(
    searchTime.getTime() - 15 * 60 * 1000
  );

  const maxTime = new Date(
    searchTime.getTime() + 15 * 60 * 1000
  );

  const rides = await Ride.find({
    status: "scheduled",

    rideTime: {
      $gte: minTime,
      $lte: maxTime,
    },

    "source.location": {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [
            Number(lng),
            Number(lat),
          ],
        },
        $maxDistance: 1000,
      },
    },
  }).populate("driverId", "name email");

  const scoredRides = rides.map((ride) => {
    const match = calculateMatchScore(ride, {
      colonyId: userColonyId,
      destinationLat,
      destinationLng,
    });

    return {
      ...ride.toObject(),
      matchScore: match.score,
      matchReasons: match.reasons,
    };
  });

  scoredRides.sort(
    (a, b) => b.matchScore - a.matchScore
  );

  return scoredRides;
};

module.exports = {
  findMatchingRides,
};