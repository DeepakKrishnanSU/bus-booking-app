const mongoose = require("mongoose");

const busBookingSchema = new mongoose.Schema({
  ticketNumber: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{6}-\d{6}$/, "Invalid ticket number format (e.g. 123456-654321)"],
  },
  userEmail: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  busId: {
    type: String,
    required: true,
  },
  busName: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
  },
  seatNumber: {
    type: String,
  },
  price: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["Booked", "Cancelled"],
    default: "Booked",
  },
  bookedAt: {
    type: Date,
    default: Date.now,
  },
});

const BusBooking = mongoose.model("BusBooking", busBookingSchema);

module.exports = BusBooking;