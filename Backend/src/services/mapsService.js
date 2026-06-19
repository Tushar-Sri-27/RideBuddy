const axios = require("axios");

const geocodeAddress = async (address) => {
  const response = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
      params: {
        q: address,
        format: "json",
        limit: 1,
      },
      headers: {
        "User-Agent": "RideBuddy",
      },
    }
  );

  if (!response.data.length) {
    throw new Error("Address not found");
  }

  return {
    lat: parseFloat(response.data[0].lat),
    lng: parseFloat(response.data[0].lon),
  };
};

const getRouteDetails = async (
  sourceLng,
  sourceLat,
  destinationLng,
  destinationLat
) => {
  const response = await axios.post(
    "https://api.openrouteservice.org/v2/directions/driving-car",
    {
      coordinates: [
        [sourceLng, sourceLat],
        [destinationLng, destinationLat],
      ],
    },
    {
      headers: {
        Authorization: process.env.ORS_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  const summary = response.data.routes[0].summary;

  return {
    distanceKm: summary.distance / 1000,
    durationMin: summary.duration / 60,
  };
};

module.exports = {
  geocodeAddress,
  getRouteDetails,
};