import React from "react";
import styles from "./CustomDialog.module.css"; // استفاده از CSS Module

const CustomDialog = ({ isOpen, onClose, transport }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.dialog}>
      <div className={styles.dialogContent}>
        <h2>درخواست باربری</h2>
        <p>{transport && transport.car_name}</p>
        {/* اضافه کردن محتوا و فرم درخواست باربری */}
        <button onClick={onClose}>بستن</button>
      </div>
    </div>
  );
};

export default CustomDialog;
