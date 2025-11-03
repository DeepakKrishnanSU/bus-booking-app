import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:7000/api/user/login", formData);

      if (response.status === 200) {
        const { token, user } = response.data;

        // ✅ Save token and user info
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        alert("Login successful!");
        console.log("🔐 JWT Token:", token);

        // ✅ Redirect based on role
        if (user.role === "admin") {
          navigate("/admin", { state: { email: user.email } }); // pass admin email
        } else {
          navigate("/home", { state: { email: user.email } }); // pass user email to Home.jsx
        }
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Invalid login credentials"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p className="signup-text">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;