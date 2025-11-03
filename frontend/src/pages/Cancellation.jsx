import React, { useState } from "react";
import axios from "axios";
import "./Cancellation.css";
const VITE_API_URL = import.meta.env.VITE_API_URL;

function Cancellation() {
  const [ticket, setTicket] = useState("");

  const handleCancel = async () => {
  const pattern = /^\d{6}-\d{6}$/;
  if (!pattern.test(ticket)) {
    alert("❌ Invalid ticket number format. Use: 123456-987654");
    return;
  }

  try {
    const res = await fetch(`${VITE_API_URL}/api/bookings/cancel/${ticket}`, {
      method: "PUT",
    });

    if (res.ok) {
      alert("✅ Cancellation Successful!");
      setTicket("");
    } else {
      alert("❌ Cancellation failed. Ticket not found or server error.");
    }
  } catch (err) {
    alert("⚠️ Server error. Please try again later.");
  }
};

  return (
    <div className="cancellation-page">
      <div className="cancellation-container">
        <a href="/home" className="back-home-btn">← Back to Home</a>
        <h1>Cancellation</h1>
        <label>Enter Ticket Number</label>
        <input
          type="text"
          placeholder="123456-987654"
          value={ticket}
          onChange={(e) => setTicket(e.target.value)}
        />
        <button onClick={handleCancel}>Delete Ticket</button>
      </div>
    </div>
  );
}

export default Cancellation;