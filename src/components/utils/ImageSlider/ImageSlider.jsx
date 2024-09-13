import React, { useState } from "react";
import styles from "./ImageSlider.module.css"; // ایجاد استایل جدید برای اسلایدر

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.imageWrapper}>
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className={styles.sliderImage}
        />
      </div>
      <div className={styles.dotsContainer}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ""}`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
