// TourismPackagesPage.js
import React from "react";
import India from "./Image/India.jpg";
import Dubai from "./Image/dubai.jpg";
import France from "./Image/france.jpg";
import Itally from "./Image/itally.jpg";
import Spain from "./Image/spain.jpg";
import Australia from "./Image/australia.jpg";
import "./Tour.css"; // Import the CSS file

const TourismPackage = ({ name, description, price, duration, image }) => (
  <div className="tourism-package">
    <img src={image} alt={name} />
    <div className="package-details">
      <h3>{name}</h3>
      <p>Price: ${price}</p>
      <p>{description}</p>
      <p>Duration: {duration}</p>
      <button onClick={() => handleBooking(name)}>Book Now</button>
    </div>
  </div>
);

const handleBooking = (packageName) => {
  alert(`You have booked the ${packageName} package!`);
};

const TourismPackagesPage = () => {
  return (
    <div className="tourism-packages-page">
      <h1 className="packages-title">Our Tourism Packages</h1>
      <div className="packages-container">
        <TourismPackage
          name="INDIA"
          description="Explore the diverse culture and rich heritage of India. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit ducimus illum corporis magni voluptas, ex eum dolorum quia officia! Deleniti quia ut."
          duration="4 days"
          price={500}
          image={India} // Import the image directly
        />
        <TourismPackage
          name="DUBAI"
          description="Experience luxury and modernity in Dubai. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit ducimus illum corporis magni voluptas, ex eum dolorum quia officia! Deleniti quia ut."
          duration="7 days"
          price={700}
          image={Dubai} // Import the image directly
        />
        <TourismPackage
          name="FRANCE"
          description="Discover the romantic charm of France. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit ducimus illum corporis magni voluptas, ex eum dolorum quia officia! Deleniti quia ut."
          duration="4 days"
          price={500}
          image={France} // Import the image directly
        />
        <TourismPackage
          name="ITALY"
          description="Explore historic landmarks and delectable cuisine in Italy. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit ducimus illum corporis magni voluptas, ex eum dolorum quia officia! Deleniti quia ut."
          duration="6 days"
          price={500}
          image={Itally} // Import the image directly
        />
        <TourismPackage
          name="SPAIN"
          description="Experience vibrant culture and beautiful landscapes in Spain. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit ducimus illum corporis magni voluptas, ex eum dolorum quia officia! Deleniti quia ut."
          duration="10 days"
          price={400}
          image={Spain} // Import the image directly
        />
        <TourismPackage
          name="AUSTRALIA"
          description="Explore the stunning beauty and wildlife of Australia. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit ducimus illum corporis magni voluptas, ex eum dolorum quia officia! Deleniti quia ut."
          duration="12 days"
          price={300}
          image={Australia} // Import the image directly
        />
      </div>
    </div>
  );
};

export default TourismPackagesPage;
