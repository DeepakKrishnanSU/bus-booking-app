import React, { useState, useEffect } from "react";
import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;
import { useNavigate, useLocation } from "react-router-dom";
import "./Home.css";

function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from login page
  const email = location.state?.email || "";

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const res = await axios.get(`${VITE_API_URL}/api/routes`);
        setRoutes(res.data);
      } catch (err) {
        console.error("Error fetching routes:", err);
      }
    };
    fetchRoutes();
  }, []);

  // Handle Search and pass email to BusResults
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!from || !to || !date) {
      alert("Please select all fields before searching!");
      return;
    }

    try {
      const response = await axios.get(`${VITE_API_URL}/api/bus-schedule/search`, {
        params: { from, to, date },
      });

      navigate("/bus-results", {
        state: {
          buses: response.data,
          from,
          to,
          date,
          email,
        },
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        navigate("/bus-results", {
          state: { buses: [], from, to, date, email },
        });
      } else {
        alert("Error fetching buses. Please try again later.");
      }
    }
  };

  const uniqueFrom = [...new Set(routes.map((r) => r.from))];
  const uniqueTo = [...new Set(routes.map((r) => r.to))];
  const today = new Date().toISOString().split("T")[0];
  const isDisabled = !from || !to || !date;

  return (
    <div className="home-page">
      {/* 🔹 Top Menu */}
      <nav className="top-menu">
        <ul>
          <li onClick={() => navigate("/cancellation")}>Cancellation</li>
          <li onClick={() => navigate("/feedback")}>Feedback</li>
          <li onClick={() => navigate("/gallery")}>Gallery</li>
          <li onClick={() => navigate("/status-check")}>Status Check</li>
        </ul>
      </nav>

      {/* 🔹 Centered Booking Form */}
      <div className="main-content">
        <fieldset className="search-box">
          <legend>Book Your Journey</legend>
          <form onSubmit={handleSubmit}>
            <label>Travelling From</label>
            <select value={from} onChange={(e) => setFrom(e.target.value)}>
              <option value="">Select city</option>
              {uniqueFrom.map((city, idx) => (
                <option key={idx} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <label>Going To</label>
            <select value={to} onChange={(e) => setTo(e.target.value)}>
              <option value="">Select city</option>
              {uniqueTo.map((city, idx) => (
                <option key={idx} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <label>Journey Date</label>
            <input
              type="date"
              value={date}
              min={today}
              onChange={(e) => setDate(e.target.value)}
              required
            />

            <button type="submit" disabled={isDisabled}>
              Search Buses
            </button>
          </form>
        </fieldset>
      </div>
    </div>
  );
}

export default Home;