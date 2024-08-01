import React, { useState } from "react";
import styles from "./style_card_bazar_vertical.module.css";
import CountdownTimer from "../timer/CountdownTimer";
import clock from "../../assets/images/clock.png";
import Config from "../../config/config";
import nopic from "../../assets/images/nopic.png";
import ModalDetails from "../utils/ModalProduct";  // Import ModalDetails
import ModalBider from "../utils/ModalBider";  // Import ModalBider

const CardVertical = ({ items }) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const openDetailsModal = (item) => {
    setCurrentItem(item);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setCurrentItem(null);
  };

  const openBidModal = (item) => {
    setCurrentItem(item);
    setIsBidModalOpen(true);
  };

  const closeBidModal = () => {
    setIsBidModalOpen(false);
    setCurrentItem(null);
  };

  const handleBidSubmit = (amount) => {
    // handle bid submission
    console.log(`Bid for item ${currentItem.id}: ${amount}`);
    closeBidModal(); // Close the bid modal after submission
  };

  return (
    <div className={styles.wrapper}>
      {items.map((item) => (
        <Card 
          key={item.id} 
          item={item} 
          onClick={() => openDetailsModal(item)}
          onBidClick={() => openBidModal(item)}
        />
      ))}
      <ModalDetails
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        item={currentItem}
        isRed={currentItem ? currentItem.sell_buy === 1 : false}  // Pass isRed based on sell_buy
      />
      <ModalBider
        isOpen={isBidModalOpen}
        onClose={closeBidModal}
        onSubmit={handleBidSubmit}
      />
    </div>
  );
};

const Card = ({ item, onClick, onBidClick }) => {
  const packaging = item.attr_value.find(attr => attr.key === 'بسته بندی');
  const imageUrl = item.images.length > 0 ? `${Config.baseUrl}${item.images[0].image}` : nopic;

  // استفاده از تاریخ‌های موجود در item
  const targetDate = new Date(item.finished_time); // تاریخ پایان از API

  const isRed = item.sell_buy === 1;
  const cardStyle = isRed ? styles.card_bazar_red : styles.card_bazar_green;
  const topBiderPriceStyle = isRed ? styles.top_bider_price_red : styles.top_bider_price_green;
  const priceStyle = isRed ? styles.price_red : styles.price_green;
  const packageStyle = isRed ? styles.package_red : styles.package_green;
  const weightStyle = isRed ? styles.weight_red : styles.weight_green;
  const timerStyle = isRed ? styles.timer_red : styles.timer_green;
  const timerTitleStyle = isRed ? styles.timer_title_red : styles.timer_title_green;
  const timerIconStyle = isRed ? styles.timer_icon_red : styles.timer_icon_green;
  const bgNumberBidStyle = isRed ? styles.bg_number_bid_red : styles.bg_number_bid_green;
  const textNumberBidStyle = isRed ? styles.text_number_bid_red : styles.text_number_bid_green;

  return (
    <div className={cardStyle} onClick={onClick}>
      <img src={imageUrl} alt={item.name_type} />
      <h1>{item.name_type}</h1>
      <div className={topBiderPriceStyle}>
        بالاترین پیشنهاد :<span>{item.top_price_bid}</span> ریال
      </div>
      <div className={priceStyle}>
        قیمت :<span>{item.price}</span> ریال
      </div>
      <div className={packageStyle}>
        بسته بندی :<span>{packaging ? packaging.value : 'مشخص نشده'}</span>
      </div>
      <div className={weightStyle}>
        وزن :<span>{item.weight}</span> کیلوگرم
      </div>
      <div className={timerStyle}>
        <div className={timerTitleStyle}>
          <CountdownTimer targetDate={targetDate} />
        </div>
        <div className={timerIconStyle}>
          <img src={clock} alt="" />
        </div>
      </div>
      <div className={bgNumberBidStyle} onClick={(e) => { e.stopPropagation(); onBidClick(); }}>
        <span>{item.count_bid}</span>
        <div className={textNumberBidStyle}>پیشنهاد</div>
      </div>
    </div>
  );
};

export default CardVertical;
