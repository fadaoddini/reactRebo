
import React from "react";
import styles from './ModalDetails.module.css';
import CountdownTimer from "../timer/CountdownTimer";


const ModalDetails = ({ isOpen, onClose, item }) => {
  if (!isOpen || !item) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.modalBody}>
          <div className={styles.imageWrapper}>
            <img src={item.imageSrc || "nopic.png"} alt={item.title} className={styles.modalImage} />
          </div>
          <div className={styles.detailsWrapper}>
            <h1 className={styles.modalTitle}>{item.title}</h1>
            <p className={styles.modalDescription}>{item.description}</p>
            <CountdownTimer targetDate={new Date(item.expiryDate)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDetails;

