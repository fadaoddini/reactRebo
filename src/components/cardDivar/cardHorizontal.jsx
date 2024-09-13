import React from "react";
import styles from "./card_horizontal.module.css";
import CountdownTimer from "../timer/CountdownTimer";
import clock from "../../assets/images/clock.png";
import Config from "../../config/config";
import nopic from "../../assets/images/nopic.png";

const CardHorizontal = ({ items }) => {
  return (
    <div className={styles.wrapper}>
      {items.map((item) => <Card key={item.id} item={item} />)}
    </div>
  );
};

const Card = ({ item }) => {
  const packaging = item.attr_value.find(attr => attr.key === 'بسته بندی');
  const imageUrl = item.images.length > 0 ? `${Config.baseUrl}${item.images[0].image}` : nopic;

  const targetDate = new Date(new Date().getTime() + (0.5 * 24 * 60 * 60 * 1000) + (3 * 60 * 60 * 1000));
  
  const cardStyle = item.sell_buy === 1 ? styles.card_shop_red : styles.card_shop_green;
  const topBiderPriceStyle = item.sell_buy === 1 ? styles.top_bider_price_red : styles.top_bider_price_green;
  const priceStyle = item.sell_buy === 1 ? styles.price_red : styles.price_green;
  const packageStyle = item.sell_buy === 1 ? styles.package_red : styles.package_green;
  const weightStyle = item.sell_buy === 1 ? styles.weight_red : styles.weight_green;
  const timerStyle = item.sell_buy === 1 ? styles.timer_red : styles.timer_green;
  const timerTitleStyle = item.sell_buy === 1 ? styles.timer_title_red : styles.timer_title_green;
  const timerIconStyle = item.sell_buy === 1 ? styles.timer_icon_red : styles.timer_icon_green;
  const bgNumberBidStyle = item.sell_buy === 1 ? styles.bg_number_bid_red : styles.bg_number_bid_green;
  const textNumberBidStyle = item.sell_buy === 1 ? styles.text_number_bid_red : styles.text_number_bid_green;

  return (
    <div className={cardStyle}>
      <img src={imageUrl} alt={item.name_type} />
      <h1>{item.name_type}</h1>
      <div className={topBiderPriceStyle}>
        بالاترین پیشنهاد :<span>{item.price}</span> ریال
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
      <div className={bgNumberBidStyle}>
        <span>150</span>
        <div className={textNumberBidStyle}>پیشنهاد</div>
      </div>
    </div>
  );
};

export default CardHorizontal;
