let io;

const RideLocation = require("../models/RideLocation");

const initializeSocket = (server) => {
  const { Server } = require("socket.io");

  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    // Join Ride Room
    socket.on("joinRide", (rideId) => {
      socket.join(rideId);

      console.log(
        `Socket ${socket.id} joined ride ${rideId}`
      );
    });

    // Driver Location Update
    socket.on("driverLocation", async (data) => {
      try {
        const { rideId, lat, lng } = data;

        await RideLocation.findOneAndUpdate(
          { rideId },
          {
            rideId,
            lat,
            lng,
            updatedAt: new Date(),
          },
          {
            upsert: true,
            new: true,
          }
        );

        socket.to(rideId).emit(
          "locationUpdate",
          {
            lat,
            lng,
          }
        );

        console.log(
          `Location Updated: ${rideId}`
        );
      } catch (error) {
        console.error(
          "Location Save Error:",
          error.message
        );
      }
    });

    socket.on("disconnect", () => {
      console.log(
        "User Disconnected:",
        socket.id
      );
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error(
      "Socket.io not initialized"
    );
  }

  return io;
};

module.exports = {
  initializeSocket,
  getIO,
};