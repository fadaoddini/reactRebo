import React from "react";
import axios from 'axios';
import Config from '../../../config/config';
import { Modal, Button } from "react-bootstrap";
import styles from "./PaymentModal.module.css";
import bid3 from "../../../assets/images/bg_bid_3_num.jpg";
import bid10 from "../../../assets/images/bg_bid_10_num.jpg";
import bid20 from "../../../assets/images/bg_bid_20_num.jpg";

const PaymentModal = ({ show, handleClose }) => {

  const handlePayment = async (price, numBids) => {
    const jwtToken = sessionStorage.getItem('accessToken');
    try {
      const response = await axios.post(
        `${Config.baseUrl}/bid/payment/api/`,
        { price: price, num_bids: numBids }, // ارسال قیمت و تعداد بیدها
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          }
        }
      );

      if (response.data.status === "success") {
        // هدایت کاربر به لینک پرداخت زرین‌پال
        window.location.href = response.data.payment_link;
      } else {
        console.error("Error in payment process:", response.data.message);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Body className={styles.modalBody}>
        <h3 className={styles.titr}>
          با انتخاب یکی از موارد زیر به شما این امکان داده می‌شود تا پیشنهاد
          قیمت خود را ثبت نمائید
        </h3>
        <div className={styles.modalContent}>
          <div
            className={styles.item}
            style={{ backgroundImage: `url(${bid3})` }}
          >
            <div className={styles.bid}>
              3
              <span className={styles.bidSpan}>پیشنهاد</span>
            </div>
            <div className={styles.price}>
              147,000
              <span className={styles.priceSpan}>تومان</span>
            </div>
            <Button
              className={styles.paymentButton}
              onClick={() => handlePayment(147000, 3)} // ارسال قیمت و تعداد بید
            >
              پرداخت
            </Button>
          </div>
          <div
            className={styles.item}
            style={{ backgroundImage: `url(${bid10})` }}
          >
            <div className={styles.bid}>
              10
              <span className={styles.bidSpan}>پیشنهاد</span>
            </div>
            <div className={styles.price}>
              430,000
              <span className={styles.priceSpan}>تومان</span>
            </div>
            <Button
              className={styles.paymentButton}
              onClick={() => handlePayment(430000, 10)} // ارسال قیمت و تعداد بید
            >
              پرداخت
            </Button>
          </div>
          <div
            className={styles.item}
            style={{ backgroundImage: `url(${bid20})` }}
          >
            <div className={styles.bid}>
              20
              <span className={styles.bidSpan}>پیشنهاد</span>
            </div>
            <div className={styles.price}>
              780,000
              <span className={styles.priceSpan}>تومان</span>
            </div>
            <Button
              className={styles.paymentButton}
              onClick={() => handlePayment(780000, 20)} // ارسال قیمت و تعداد بید
            >
              پرداخت
            </Button>
          </div>
        </div>
        <div className={styles.titr2}>
          <p>
            سیستم پیشنهاد دهندگان به آگهی دهندگان این پیام را می‌دهد که بطور جد
            این افراد خواستار آگهی آنها می‌باشند
          </p>
          <p>
            این قسمت برای تاجرین و واسطه‌ها که می‌خواهند در روند بازار نقش موثر
            داشته باشند مفید است
          </p>
          <p>
            با ثبت پیشنهاد موثر، راه ارتباطی شما با بهترین گزینه‌های مورد نظرتان
            فراهم می‌گردد
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PaymentModal;
