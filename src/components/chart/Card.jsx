import React from "react";
import styles from "./Card.module.css";

// اضافه کردن آیکن‌ها
import chart from "../../assets/images/chart.png";
import bid from "../../assets/images/bid.png";
import market from "../../assets/images/market.png";

const Card = ({
  title,
  product,
  onReportClick,
  onMarketClick,
  onBidsClick,
}) => {
  return (
    <div className={styles.boxCardSingle}>
      <div className={styles.boxCardInner}>
        <div className={styles.boxCardTitle}>{title}</div>
        <div className={styles.boxCardBtn}>
          <a href="#" onClick={onReportClick} className={styles.fillBtn}>
            <img src={chart} alt="Report Icon" />
            <span className={styles.badge}>گزارش</span> {/* اضافه کردن badge */}
          </a>
          <a href="#" onClick={onMarketClick} className={styles.fillBtn}>
            <img src={market} alt="Market Icon" />
            <span className={styles.badge}>بازار</span> {/* اضافه کردن badge */}

          </a>
          <a
            href="#"
            onClick={() => onBidsClick(product.id, title)}
            className={styles.fillBtn}
          >
            <img src={bid} alt="Bids Icon" />
            <span className={styles.badge}>پیشنهادات</span> {/* اضافه کردن badge */}

          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
