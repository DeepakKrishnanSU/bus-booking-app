import React, { useState } from "react";
import axios from "axios";
import "./StatusCheck.css";
const VITE_API_URL = import.meta.env.VITE_API_URL;

function StatusCheck() {
  const [ticketNumber, setTicketNumber] = useState("");
  const [stops, setStops] = useState([]);
  const [busName, setBusName] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [error, setError] = useState("");

  const handleCheckStatus = async () => {
    if (!ticketNumber.trim()) {
      setError("Please enter your ticket number");
      return;
    }
    try {
      const res = await axios.get(`${VITE_API_URL}/api/bookings/status/${ticketNumber}`);
      setBusName(res.data.busName);
      setStartPoint(res.data.busStartLocation);
      setEndPoint(res.data.busEndLocation);
      setStops(res.data.stops);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Invalid ticket number or no record found");
      setStops([]);
      setBusName("");
      setStartPoint("");
      setEndPoint("");
    }
  };

  return (
    <div className="status-page">
      <div className="status-container">
        <a href="/home" className="back-home-btn">← Back to Home</a>
        <h1>Check Bus Status</h1>
        <label>Enter Ticket Number</label>
        <input
          type="text"
          placeholder="123456-987654"
          value={ticketNumber}
          onChange={(e) => setTicketNumber(e.target.value)}
        />
        <button onClick={handleCheckStatus}>Check Status</button>

        {error && <p className="error">{error}</p>}

        {busName && (
          <div className="status-result">
            <h2>{busName}</h2>
            <ul className="stops-list">
              <li>
                <span className="stop-number" style={{ background: "#16a34a" }}>S</span>
                <span className="stop-name">{startPoint}</span>
              </li>

              {stops.map((stop, index) => (
                <li key={index}>
                  <span className="stop-number">{index + 1}</span>
                  <span className="stop-name">{stop}</span>
                </li>
              ))}

              <li>
                <span className="stop-number" style={{ background: "#dc2626" }}>E</span>
                <span className="stop-name">{endPoint}</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatusCheck;