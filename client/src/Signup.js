import React, { useState } from "react";
import axios from "axios";
import "./Signup.css"; // Import your CSS file

function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState(""); // New state for mobile number
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", {
        firstName,
        lastName,
        email,
        mobileNumber, // Include mobileNumber in the request
        password,
        confirmPassword,
      });

      console.log(response); // Log the entire response object

      if (response && response.data) {
        // Handle success - show alert and redirect
        window.alert("Registration successful!");
        window.location.href = "/login"; // Redirect to login page
      } else {
        // Handle unexpected response format
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle error response from the backend
        console.error("Error during registration:", error.response.data);
      } else {
        // Handle other errors (e.g., network issues)
        console.error("Error during registration:", error.message);
      }
    }
  };

  return (
    <div className="signup-page-bg">
      <div className="container">
        <div className="left-section"></div>
        <div className="right-section">
          <h2 className="signup-heading">Sign Up</h2>
          <form onSubmit={handleSignup} className="input-container">
            <input
              type="text"
              className="signup-input"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              className="signup-input"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="email"
              className="signup-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="tel" // Use type="tel" for mobile numbers
              className="signup-input"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
            <input
              type="password"
              className="signup-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              className="signup-input"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
