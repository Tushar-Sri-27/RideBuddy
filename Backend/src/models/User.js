const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      default: "",
    },

    colonyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Colony",
      default: null,
    },

    role: {
      type: String,
      enum: ["driver", "passenger"],
      default: "passenger",
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0], // [lng, lat]
      },
    },

    totalFuelSaved: {
      type: Number,
      default: 0,
    },

    totalMoneySaved: {
      type: Number,
      default: 0,
    },

    totalCO2Saved: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Geo Index
userSchema.index({
  location: "2dsphere",
});

module.exports = mongoose.model("User", userSchema);