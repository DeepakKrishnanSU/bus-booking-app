import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Feedback.css";

function Feedback() {
  const [ticketNumber, setTicketNumber] = useState("");
  const [feedback, setFeedback] = useState({
    experience: "",
    cleanliness: "",
    driver: "",
    support: "",
    rating: 0,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleStarClick = (star) => {
    setFeedback({ ...feedback, rating: star });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ticketFormat = /^\d{6}-\d{6}$/;

    if (!ticketFormat.test(ticketNumber.trim())) {
      alert("❌ Invalid Ticket Number Format");
      return;
    }

    if (feedback.rating === 0) {
      alert("Please provide a star rating before submitting!");
      return;
    }

    alert("✅ Feedback Submitted Successfully!");
    setTicketNumber("");
    setFeedback({
      experience: "",
      cleanliness: "",
      driver: "",
      support: "",
      rating: 0,
    });
    setSubmitted(true);
  };

  return (
    <div className="feedback-container">
      {/* 🔹 Back to Home Button */}
      <Link to="/home" className="back-home-btn">← Back to Home</Link>

      <h1>Passenger Feedback</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter Ticket Number:</label>
        <input
          type="text"
          placeholder="123456-987654"
          value={ticketNumber}
          onChange={(e) => setTicketNumber(e.target.value)}
          maxLength="13"
          required
        />

        <label>How was your travel experience?</label>
        <textarea
          name="experience"
          value={feedback.experience}
          onChange={handleChange}
          placeholder="Share your thoughts..."
          required
        />

        <label>How was the bus cleanliness?</label>
        <select
          name="cleanliness"
          value={feedback.cleanliness}
          onChange={handleChange}
          required
        >
          <option value="">Select an option</option>
          <option value="Excellent">Excellent</option>
          <option value="Good">Good</option>
          <option value="Average">Average</option>
          <option value="Poor">Poor</option>
        </select>

        <label>How was the driver’s behavior?</label>
        <select
          name="driver"
          value={feedback.driver}
          onChange={handleChange}
          required
        >
          <option value="">Select an option</option>
          <option value="Polite">Polite</option>
          <option value="Average">Average</option>
          <option value="Rude">Rude</option>
        </select>

        <label>How satisfied are you with booking & support?</label>
        <select
          name="support"
          value={feedback.support}
          onChange={handleChange}
          required
        >
          <option value="">Select an option</option>
          <option value="Very Satisfied">Very Satisfied</option>
          <option value="Satisfied">Satisfied</option>
          <option value="Neutral">Neutral</option>
          <option value="Unsatisfied">Unsatisfied</option>
        </select>

        <label>Overall Rating:</label>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= feedback.rating ? "star selected" : "star"}
              onClick={() => handleStarClick(star)}
            >
              ★
            </span>
          ))}
        </div>

        <button type="submit">Submit Feedback</button>
      </form>

      {submitted && (
        <p className="thankyou">Thank you for your valuable feedback!</p>
      )}
    </div>
  );
}

export default Feedback;