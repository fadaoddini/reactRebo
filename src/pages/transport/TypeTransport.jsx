import React, { useRef, useState } from "react";
import styles from "./type_transport.module.css";
import Config from "../../config/config";

const TypeTransport = ({ types, selectedType, onSelect }) => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // شروع درگ
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  // پایان درگ
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // خروج از ناحیه درگ
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // حرکت موس
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // تغییر ضریب حرکت برای نرمی بیشتر
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      className={styles.typeTransportContainer}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <button
        onClick={() => onSelect(null)}
        className={`${styles.tab} ${selectedType === null ? styles.active : ""}`}
      >
        همه
      </button>
      {types.map((type) => (
        <button
          key={type.id}
          onClick={() => onSelect(type)}
          className={`${styles.tab} ${selectedType?.id === type.id ? styles.active : ""}`}
        >
          <div className={styles.imageContainer}>
            <img src={`${Config.baseUrl}${type.image}`} alt={type.title} />
          </div>
          <p>{type.title}</p>
        </button>
      ))}
    </div>
  );
};

export default TypeTransport;
