const mongoose = require("mongoose");

const impactSchema = new mongoose.Schema(
  {
    rideId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ride",
      required: true,
    },

    fuelSaved: {
      type: Number,
      default: 0,
    },

    co2Reduced: {
      type: Number,
      default: 0,
    },

    moneySaved: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Impact",
  impactSchema
);