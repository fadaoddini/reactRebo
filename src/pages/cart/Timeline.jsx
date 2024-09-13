import React from 'react';
import styles from './style_cart.module.css';

const Timeline = ({ currentStep }) => {
  return (
    <div className={styles.timeline}>
      <div className={`${styles.step} ${currentStep >= 1 ? styles.completed : ''}`}>
        <div className={styles.stepNumber}>1</div>
        <div className={styles.stepTitle}> تأیید سفارش</div>
      </div>
      <div className={`${styles.step} ${currentStep >= 2 ? styles.completed : ''}`}>
        <div className={styles.stepNumber}>2</div>
        <div className={styles.stepTitle}>تأیید آدرس</div>
      </div>
      <div className={`${styles.step} ${currentStep >= 3 ? styles.completed : ''}`}>
        <div className={styles.stepNumber}>3</div>
        <div className={styles.stepTitle}> بازبینی نهایی</div>
      </div>
      <div className={`${styles.step} ${currentStep >= 4 ? styles.completed : ''}`}>
        <div className={styles.stepNumber}>4</div>
        <div className={styles.stepTitle}> پرداخت</div>
      </div>
    </div>
  );
};

export default Timeline;
