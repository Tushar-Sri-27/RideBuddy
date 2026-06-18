const getDistance = require("../utils/distance");

const calculateMatchScore = (ride, userData) => {
  let score = 0;
  const reasons = [];

  // Same Colony
  if (
    ride.colonyId &&
    userData.colonyId &&
    ride.colonyId.toString() === userData.colonyId.toString()
  ) {
    score += 50;
    reasons.push("Same Colony");
  }

  // Destination Similarity
  const destinationDistance = getDistance(
    Number(userData.destinationLat),
    Number(userData.destinationLng),

    ride.destination.location.coordinates[1],
    ride.destination.location.coordinates[0]
  );

  if (destinationDistance <= 500) {
    score += 30;
    reasons.push("Destination Match");
  }

  // Nearby Pickup
  score += 20;
  reasons.push("Nearby Pickup");

  return {
    score,
    reasons,
  };
};

module.exports = calculateMatchScore;