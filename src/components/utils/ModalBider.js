
import React, { useState } from "react";
import styles from "./style_modal.module.css"; // استایل دیالوگ

const ModalBider = ({ isOpen, onClose, onSubmit }) => {
  const [bidAmount, setBidAmount] = useState("");

  const handleSubmit = () => {
    if (bidAmount) {
      onSubmit(bidAmount);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>ثبت پیشنهاد</h2>
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder="مقدار پیشنهاد"
        />
        <button onClick={handleSubmit}>ثبت پیشنهاد</button>
        <button onClick={onClose}>بستن</button>
      </div>
    </div>
  );
};

export default ModalBider;
