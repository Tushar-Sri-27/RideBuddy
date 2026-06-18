const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const colonyRoutes = require("./routes/colony");
const rideRoutes = require("./routes/ride");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "RideCircle Backend Running 🚀",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/colonies", colonyRoutes);
app.use("/api/rides", rideRoutes);

module.exports = app;