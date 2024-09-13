import React, { useEffect } from "react";
import styles from "./SuccessMessage.module.css";

const SuccessMessage = ({ message, onClose, isOpen }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000); // بستن پیام بعد از 1 ثانیه

      return () => clearTimeout(timer); // پاک کردن تایمر در صورت بروز تغییرات
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null; // نمایش ندادن پیام در صورت باز نبودن

  return (
    <div className={styles.overlay}>
      <div className={styles.messageBox}>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export default SuccessMessage;
