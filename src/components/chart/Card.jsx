import React from 'react';
import styles from './Card.module.css';

const Card = ({ title, onReportClick, onMarketClick }) => {
  return (
    <div className={`${styles.boxCardSingle} ${styles.boxCardWallet} ${styles.walletTorus} ${styles.mb40} ${styles.wow} ${styles.fadeInUp}`}>
      <div className={styles.boxCardInner}>
        <h4 className={styles.boxCardTitle}>{title}</h4>
        <div className={styles.boxCardBtn}>
          <a href="#" onClick={onReportClick} className={styles.fillBtn}>نمایش گزارش</a>
          <a href="#" onClick={onMarketClick} className={styles.fillBtnOrange}>نمایش بازار</a>
        </div>
      </div>
    </div>
  );
};

export default Card;
