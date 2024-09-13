import React from "react";
import TransportNotPay from "./transportList/TransportNotPay";
import styles from "./right.module.css"; 
import TransportNotActive from "./transportList/TransportNotActive";
import TransportActive from "./transportList/TransportActive";

const TransportSidebare = () => {
  return (
    <div>
        <h6 className={styles.title}>آگهی های پرداخت نشده من</h6>
        <TransportNotPay />

        <h6 className={styles.title}>آگهی های در حال بررسی من</h6>
        <TransportNotActive />

        <h6 className={styles.title}>آگهی های فعال من</h6>
        <TransportActive />
      
    </div>
  );
};

export default TransportSidebare;
