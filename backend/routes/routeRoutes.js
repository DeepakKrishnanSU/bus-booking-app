const express = require("express");
const Route = require("../models/routeModel");

const router = express.Router();

// ✅ POST: Add new route
router.post("/add", async (req, res) => {
  try {
    const { from, to } = req.body;

    if (!from || !to) {
      return res.status(400).json({ message: "Both fields are required" });
    }

    const newRoute = new Route({ from, to });
    await newRoute.save();

    res.status(201).json({ message: "Route added successfully", newRoute });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ GET: Fetch all routes (Public – for user Home page)
router.get("/", async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ DELETE: Remove a route
router.delete("/delete/:id", async (req, res) => {
  try {
    const route = await Route.findByIdAndDelete(req.params.id);
    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }
    res.json({ message: "Route deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete route", error: error.message });
  }
});

module.exports = router;