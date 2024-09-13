import React, { useState } from 'react';
import { useBidContext } from '../../pages/bazar/BidContext';
import AlertMessage from '../../components/utils/AlertMessage'; // اضافه کردن کامپوننت پیام هشدار
import styles from './style_modal.module.css'; // استایل دیالوگ

const ModalBider = ({ isOpen, onClose, currentItem }) => {
  const [bidAmount, setBidAmount] = useState("");
  const { addBid } = useBidContext(); // استفاده از Context
  const [alertOpen, setAlertOpen] = useState(false); // حالت برای مدیریت نمایش پیام هشدار


  const handleSubmit = async () => {
    const jwtToken = sessionStorage.getItem('accessToken'); // دریافت توکن JWT
    if (!jwtToken) {
      setAlertOpen(true); // نمایش پیام هشدار در صورت عدم وجود توکن
      return;
    }

    if (bidAmount && currentItem) {
      try {
        await addBid(bidAmount, currentItem.id); // استفاده از تابع Context برای ارسال پیشنهاد
        console.log("Bid submitted and product updated successfully.");
      } catch (error) {
        console.error("Error submitting bid:", error.message);
      }
      onClose();
    } else {
      console.error("No bid amount or current item found");
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

        {/* نمایش پیام هشدار در صورت عدم وجود JWT */}
        <AlertMessage
          message="لطفا قبل از ثبت پیشنهاد وارد سامانه شوید"
          isOpen={alertOpen}
          onClose={() => setAlertOpen(false)}
        />

        
      </div>
    </div>
  );
};

export default ModalBider;
