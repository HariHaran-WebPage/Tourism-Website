import React from "react";
import logo from "./Image/Logo.png"; // Import your logo image
import "./menubar.css"; // Import CSS file

const Menubar = ({ role }) => {
  return (
    <div className="menubar">
      <div className="left-content">
        <img src={logo} alt="Logo" className="logo" />
        <span className="company-name">MEEZAR-TOURISM</span>
      </div>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/tourism">Tour Packages</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          {role === "admin" && (
            <li>
              <a href="/Admin">Admin Dashboard</a>
            </li>
          )}
          {role === "staff" && (
            <li>
              <a href="/Staff">Staff Form</a>
            </li>
          )}
          <li>
            <a href="/login">Login</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menubar;
