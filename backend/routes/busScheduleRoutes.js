const express = require("express");
const router = express.Router();
const BusSchedule = require("../models/busScheduleModel");

// Add a new bus schedule
router.post("/add", async (req, res) => {
  try {
    const {
      busName,
      departureTime,
      busDate,
      busStartLocation,
      busEndLocation,
      timeDuration,
      busType,
      busPrice,
      stops,
      seats,
    } = req.body;

    // Validate all required fields
    if (
      !busName ||
      !departureTime ||
      !busDate ||
      !busStartLocation ||
      !busEndLocation ||
      !timeDuration ||
      !busType ||
      !busPrice ||
      !stops ||
      !seats
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new bus schedule
    const newSchedule = new BusSchedule({
      busName,
      departureTime,
      busDate,
      busStartLocation,
      busEndLocation,
      timeDuration,
      busType,
      busPrice,
      stops,
      seats,
    });

    await newSchedule.save();
    res.status(201).json({
      message: "Bus schedule added successfully",
      newSchedule,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all bus schedules
router.get("/", async (req, res) => {
  try {
    const schedules = await BusSchedule.find();
    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search buses by route and date
router.get("/search", async (req, res) => {
  try {
    const { from, to, date } = req.query;

    const buses = await BusSchedule.find({
      busStartLocation: from,
      busEndLocation: to,
      busDate: date,
    });

    if (!buses || buses.length === 0) {
      return res.status(404).json({ message: "No buses found for this route" });
    }

    res.status(200).json(buses);
  } catch (err) {
    console.error("Error searching buses:", err);
    res.status(500).json({ error: "Server error while fetching buses" });
  }
});

// Delete a bus schedule
router.delete("/:id", async (req, res) => {
  try {
    const schedule = await BusSchedule.findByIdAndDelete(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: "Bus schedule not found" });
    }
    res.status(200).json({ message: "Bus schedule deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;