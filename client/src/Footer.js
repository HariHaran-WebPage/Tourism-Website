import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "./footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your newsletter subscription logic here
    console.log("Subscribed with email:", email);
    setEmail(""); // Clear the input field after submission
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <p>Meezar Tourism</p>
          <p>
            HAL Old Airport Road ,<br /> Banglore
          </p>
          <p>+18 99 999 999</p>
          <p>contact@meezar.com</p>
        </div>

        <div className="social-icons">
          <a
            href="https://wa.me/your-number"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
          <a
            href="https://www.facebook.com/your-page"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a
            href="https://www.instagram.com/your-account"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="https://twitter.com/your-account"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </div>
      </div>

      <div className="quick-links">
        <h1>Quick Links</h1>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/tourism">Tour Packages</a>
        <a href="/contact">Contact</a>
        <a href="/login">Login</a>
      </div>

      <div className="destinations">
        <h1>Destinations</h1>
        <a href="/tourism">India</a>
        <a href="/tourism">France</a>
        <a href="/tourism">Dubai</a>
        <a href="/tourism">Spain</a>
        <a href="/tourism">Australia</a>
      </div>

      <div className="newsletter">
        <h1>Newsletter</h1>
        <p>
          lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
          nisi!
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleInputChange}
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      <div className="copyright">
        <p>All rights reserved by Meezar Tourism</p>
      </div>
    </footer>
  );
};

export default Footer;
