// AboutUs.js

import React from "react";
import About from "./Image/About.jpg";
import About1 from "./Image/About1.jpg";
import "./AboutUs.css"; // Import the CSS file

const AboutUs = () => {
  return (
    <div>
      <div className="container1">
        <h1>About Us</h1>
      </div>

      <div className="text-container2">
        <div className="text-content">
          <h1>
            Each & Every Moment Of Your Life Enjoy Explore All Corners Of The
            World With Us, Your Adventure Starts Here!
          </h1>
        </div>
        <img src={About1} alt="About us" className="Aboutus1" />
      </div>

      <div className="text-container3">
        <img src={About} alt="About us" className="Aboutus" />
        <div className="text-content">
          <h2>
            Welcome to Meezar Tourism, where unforgettable adventures await! At
            Meezar, we are passionate about creating unique and immersive travel
            experiences that will leave you with memories to last a lifetime.
            Our team of expert guides and travel enthusiasts are dedicated to
            showcasing the beauty and culture of each destination we offer.
            Whether you are seeking a thrilling mountain trek, a relaxing beach
            getaway, or a cultural exploration through bustling markets and
            ancient ruins, Meezar has something for every type of traveler. Our
            carefully curated tours and tailored itineraries ensure that you
            make the most of your time away, allowing you to immerse yourself in
            the wonders of each location. Join us at Meezar Tourism and let us
            help you discover the world in a whole new way.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
