import React from "react";
import "./ImageCard.css";

const AdvertisingOne = ({ image, title, link, icon }) => {
  return (
    <div className="bg_card_advertising">
      <a
        href={link}
        className="image-card"
        style={{ backgroundImage: `url(${image})` }}
      >
        <span className="icon">
          <img src={icon} alt="icon" />
        </span>
        <div className="overlay">
          <h3 className="textColorH3">{title}</h3>
        </div>
      </a>
    </div>
  );
};

export default AdvertisingOne;
