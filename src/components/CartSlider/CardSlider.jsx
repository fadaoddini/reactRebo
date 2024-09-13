import React, { useRef } from "react";
import styles from "./CardSlider.module.css";
import fakeData from "./fakeData"; // اضافه کردن داده‌های فیک

const CardSlider = () => {
  const containerRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    containerRef.current.classList.add(styles.active);
    startX = e.pageX - containerRef.current.offsetLeft;
    scrollLeft = containerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
    containerRef.current.classList.remove(styles.active);
  };

  const handleMouseUp = () => {
    isDown = false;
    containerRef.current.classList.remove(styles.active);
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.2; // سرعت حرکت
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      className={styles.container}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {fakeData.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  );
};

const Card = ({ card }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const { images, title, stock, price, discount, deliveryLimit } = card;

  // تغییر تصویر با کلیک روی نقاط
  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className={styles.card}>
      <div className={styles.image_container}>
        <div className={styles.slider}>
          <img
            src={images[currentImageIndex]}
            alt="Product"
            className={styles.image}
          />
        </div>
        <div className={styles.dots}>
          {images.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${currentImageIndex === index ? styles.active : ""}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>
      <div className={styles.info}>
        <h3>{title}</h3>
        <p>موجودی: {stock}</p>
        <p>قیمت: {price}</p>
        <p>تخفیف: {discount}%</p>
        <p>محدودیت ارسال: {deliveryLimit}</p>
      </div>
    </div>
  );
};

export default CardSlider;
