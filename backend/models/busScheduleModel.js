const mongoose = require("mongoose");

const busScheduleSchema = new mongoose.Schema({
  busName: { type: String, required: true },
  departureTime: { type: String, required: true },
  busDate: { type: String, required: true },
  busStartLocation: { type: String, required: true },
  busEndLocation: { type: String, required: true },
  timeDuration: { type: String, required: true },
  busType: { type: String, required: true },
  busPrice: { type: Number, required: true },
  stops: { type: [String], required: true },
  seats: { type: Number, required: true },
});

module.exports = mongoose.model("BusSchedule", busScheduleSchema);