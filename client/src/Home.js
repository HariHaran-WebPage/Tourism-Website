import React, { useState } from "react";
import Bg from "./Image/BG.jpg";
import India from "./Image/India.jpg";
import Dubai from "./Image/dubai.jpg";
import France from "./Image/france.jpg";
import Itally from "./Image/itally.jpg";
import Spain from "./Image/spain.jpg";
import Australia from "./Image/australia.jpg";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [destination, setDestination] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [averagePrice, setAveragePrice] = useState("");
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setShowDetails(!showDetails);
  };

  const handleSearch = () => {
    navigate("/tourism");
  };

  return (
    <div>
      <div className="home-container">
        <img src={Bg} alt="BackgroundImg" className="bg-image" />
        <div className="content1">
          <h1>TRAVEL THE WORLD</h1>
          <p>Enjoy your Holiday</p>
        </div>

        <div className="content">
          <h1>NEVER FEEL ALONE, TRAVEL WITH MEEZARTOURISM!</h1>
          <button className="detail-button" onClick={handleButtonClick}>
            {showDetails ? "Hide Details" : "Show Details"}
          </button>
        </div>

        {showDetails && (
          <div className="details">
            <h2>Destination:</h2>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              <option value="">Select Destination</option>
              <option value="India">India</option>
              <option value="France">France</option>
              <option value="Dubai">Dubai</option>
              <option value="Spain">Spain</option>
              <option value="Itally">Itally</option>
              <option value="Australia">Australia</option>
            </select>

            <p>Date:</p>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />

            <p>Average Price:</p>
            <select
              value={averagePrice}
              onChange={(e) => setAveragePrice(e.target.value)}
            >
              <option value="">Select Average Price</option>
              <option value="200$-300$">200$ - 300$</option>
              <option value="301$-400$">301$ - 400$</option>
              <option value="401$-500$">401$ - 500$</option>
              <option value="501$-700$">501$ - 700$</option>
              <option value="701$-900$">701$ - 900$</option>
              <option value="901$-1200$">901$ - 1200$</option>
            </select>

            <button className="search-button" onClick={handleSearch}>
              Search
            </button>
          </div>
        )}
      </div>

      <div className="image-widget">
        <img src={India} alt="" />
        <img src={Dubai} alt="" />
        <img src={Australia} alt="" />
        <img src={Itally} alt="" />
        <img src={Spain} alt="" />
        <img src={France} alt="" />
      </div>
    </div>
  );
};

export default Home;
