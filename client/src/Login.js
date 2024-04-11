import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
  const navigate = useNavigate();
  const [mobileNumber, setmobileNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        mobileNumber,
        password,
      });

      if (response.status === 200) {
        console.log("Login successful!");
        navigate("/");
      } else {
        console.error("Login failed:", response.data);
        // Display an alert for failed login
        alert("Incorrect phone number or password. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      // Display an alert for any error during login
      alert("User not found. Please Register.");
    }
  };

  return (
    <div className="login-page-bg">
      <div className="container">
        <div className="left-section"></div>
        <div className="right-section">
          <h2 className="login-heading">LOGIN</h2>
          <form onSubmit={handleLogin}>
            <input
              type="tel"
              className="login-input"
              placeholder="mobileNumberr"
              value={mobileNumber}
              onChange={(e) => setmobileNumber(e.target.value)}
              required
            />
            <input
              type="password"
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <Link to="/signup" className="signup-link">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
