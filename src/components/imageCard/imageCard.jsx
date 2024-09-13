import React from 'react';
import './ImageCard.css';

const ImageCard = ({ image, title, link, icon }) => {
    return (
      <a href={link} className="image-card" style={{ backgroundImage: `url(${image})` }}>
        <span className="icon">
          <img src={icon} alt="icon" />
        </span>
        <div className="overlay">
          <h3 className="textColorH3" >{title}</h3>
        </div>
      </a>
    );
  };

export default ImageCard;