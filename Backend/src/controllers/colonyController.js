const Colony = require("../models/Colony");
const User = require("../models/User");

// Create Colony
const createColony = async (req, res) => {
  try {
    const { name, description, lng, lat } = req.body;

    const colony = await Colony.create({
      name,
      description,
      admin: req.user.id,
      members: [req.user.id],
      location: {
        type: "Point",
        coordinates: [lng, lat],
      },
    });

    await User.findByIdAndUpdate(req.user.id, {
      colonyId: colony._id,
    });

    res.status(201).json({
      success: true,
      message: "Colony created successfully",
      data: colony,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Join Colony
const joinColony = async (req, res) => {
  try {
    const { colonyId } = req.body;

    const colony = await Colony.findById(colonyId);

    if (!colony) {
      return res.status(404).json({
        success: false,
        message: "Colony not found",
      });
    }

    if (colony.members.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: "Already a member",
      });
    }

    colony.members.push(req.user.id);

    await colony.save();

    await User.findByIdAndUpdate(req.user.id, {
      colonyId,
    });

    res.status(200).json({
      success: true,
      message: "Joined colony successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get My Colony
const getMyColony = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.colonyId) {
      return res.status(404).json({
        success: false,
        message: "No colony joined",
      });
    }

    const colony = await Colony.findById(
      user.colonyId
    )
      .populate("admin", "name email")
      .populate("members", "name email");

    res.status(200).json({
      success: true,
      data: colony,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createColony,
  joinColony,
  getMyColony,
};