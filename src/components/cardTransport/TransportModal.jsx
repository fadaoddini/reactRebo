import React, { useState } from "react";
import styles from "./TransportModal.module.css";
import Config from "../../config/config";
import noPic from "../../assets/images/nopic.png";
import { ToastContainer, toast } from "react-toastify";

const TransportModal = ({ transport, isOpen, onClose }) => {
  const [count, setCount] = useState(1);
  const pelak = transport.pelak.toString();
  const firstTwoDigits = pelak.slice(0, 2);
  const lastThreeDigits = pelak.slice(-3);

  if (!isOpen) return null; // اگر modal باز نیست، هیچ چیز نمایش نده

  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  const handleCall = () => {
    if (transport.my_transport.mobile) {
      // برای تماس با موبایل
      window.location.href = `tel:${transport.my_transport.mobile}`;
    } else {
      toast.error("شماره موبایل در دسترس نیست.");
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={handleClose}>
          &times;
        </button>
        <div className={styles.shopCard}>
          <img
            src={
              transport.image ? `${Config.baseUrl}${transport.image}` : noPic
            }
            alt={transport.my_transport.car_name}
          />
          <h1>
            <strong>{transport.my_transport.car_name}</strong>
          </h1>
          <div className={styles.category}>
            <span>
              {transport.origin} - {transport.destination}
            </span>
          </div>
          <div className={styles.distance}>
            <strong>مسافت :</strong>
            <span> {transport.distance}</span> کیلومتر
          </div>
          <div className={styles.price}>
            <strong>قیمت :</strong>
            <span> {transport.price.toLocaleString()}</span> ریال
          </div>

          <div className={styles.transportDetails}>
            <strong>نوع حمل‌ونقل:</strong>
            <span> {transport.my_transport.transport_type}</span>
          </div>
          <div className={styles.transportDetails}>
            <strong>ظرفیت:</strong>
            <span> {transport.my_transport.capacity}</span> تن
          </div>

          <div className={styles.description}>
            <strong>توضیحات :</strong>
            <p>{transport.description}</p>
          </div>
          <div className={styles.licensePlate}>
            <div className={styles.licensePlateTop}>
              <span className={styles.licensePlateNumber}>
              {lastThreeDigits} ع {firstTwoDigits}
              </span>
              <span className={styles.right_pelak}>
                <span className={styles.licensePlateIran}>ایران</span>
                <span className={styles.licensePlateIranBottom}>
                  {transport.iran}
                </span>
              </span>
            </div>
          </div>
          <div className={styles.fillBtnOrange} onClick={handleCall}>
            تماس با راننده
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TransportModal;
