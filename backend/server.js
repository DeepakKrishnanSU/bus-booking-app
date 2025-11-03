const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Route imports
const userRoutes = require("./routes/userRoutes");
const routeRoutes = require("./routes/routeRoutes");
const adminRoutes = require("./routes/adminRoutes");
const busScheduleRoutes = require("./routes/busScheduleRoutes");
const busBookingRoutes = require("./routes/busBookingRoutes")

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use("/api/user", userRoutes);              // User signup & login
app.use("/api/routes", routeRoutes);           // Route management
app.use("/api/admin", adminRoutes);            // User and route deletion
app.use("/api/bus-schedule", busScheduleRoutes);
app.use("/api/bookings", busBookingRoutes);

// ✅ Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Basic test routes
app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.send("Please login first — (React login page will go here later).");
});

app.get("/home", (req, res) => {
  res.send("Login successful! Welcome to the Bus Booking and Tracking Application.");
});

// ✅ Error handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// ✅ Start server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});