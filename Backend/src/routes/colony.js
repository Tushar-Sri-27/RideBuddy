const express = require("express");

const {
  createColony,
  joinColony,
  getMyColony,
} = require("../controllers/colonyController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createColony);

router.post("/join", protect, joinColony);

router.get("/my", protect, getMyColony);

module.exports = router;