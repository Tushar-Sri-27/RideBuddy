const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema(
  {
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    passengers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    source: {
      address: String,

      location: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: {
          type: [Number], // [lng, lat]
          required: true,
        },
      },
    },

    destination: {
      address: String,

      location: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: {
          type: [Number], // [lng, lat]
          required: true,
        },
      },
    },

    rideTime: {
      type: Date,
      required: true,
    },

    seats: {
      type: Number,
      required: true,
    },

    availableSeats: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["scheduled", "started", "completed", "cancelled"],
      default: "scheduled",
    },

    colonyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Colony",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

rideSchema.index({
  "source.location": "2dsphere",
});

module.exports = mongoose.model("Ride", rideSchema);