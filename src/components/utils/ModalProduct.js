import React from "react";
import Config from "../../config/config";
import styles from "./style_modal_product.module.css"; // استایل‌های مربوط به Modal
import CountdownTimer from "../timer/CountdownTimer";
import nopic from "../../assets/images/nopic.png";
import clock from "../../assets/images/clock.png";

const ModalDetails = ({ isOpen, onClose, item, isRed }) => {
  if (!isOpen || !item) return null; // جلوگیری از رندر کردن اگر item نداشته باشیم

  const packaging = item.attr_value.find(attr => attr.key === 'بسته بندی');
  const targetDate = new Date(new Date().getTime() + (0.5 * 24 * 60 * 60 * 1000) + (3 * 60 * 60 * 1000));

  const overlayClass = isRed ? styles.modal_overlay_red : styles.modal_overlay_green;
  const contentClass = isRed ? styles.modal_content_red : styles.modal_content_green;
  const imageClass = isRed ? styles.modal_image_red : styles.modal_image_green;
  const closeClass = isRed ? styles.modal_close_red : styles.modal_close_green;
  const detailsClass = isRed ? styles.modal_details_red : styles.modal_details_green;
  const priceClass = isRed ? styles.modal_price_red : styles.modal_price_green;
  const packageClass = isRed ? styles.modal_package_red : styles.modal_package_green;
  const weightClass = isRed ? styles.modal_weight_red : styles.modal_weight_green;
  const topBidClass = isRed ? styles.modal_top_bid_red : styles.modal_top_bid_green;
  const timerClass = isRed ? styles.modal_timer_red : styles.modal_timer_green;
  const timerTitleClass = isRed ? styles.timer_title_red : styles.timer_title_green;
  const timerIconClass = isRed ? styles.timer_icon_red : styles.timer_icon_green;
  const bgNumberBidClass = isRed ? styles.bg_number_bid_red : styles.bg_number_bid_green;
  const textNumberBidClass = isRed ? styles.text_number_bid_red : styles.text_number_bid_green;

  return (
    <div className={overlayClass}>
      <div className={contentClass}>
        <button className={closeClass} onClick={onClose}>×</button>
        <div className={imageClass}>
          <img src={item.images.length > 0 ? `${Config.baseUrl}${item.images[0].image}` : nopic} alt={item.name_type} />
        </div>
        <div className={detailsClass}>
          <h1>{item.name_type}</h1>
          <div className={topBidClass}>
            بالاترین پیشنهاد :<span>{item.top_price_bid}</span> ریال
          </div>
          <div className={priceClass}>
            قیمت :<span>{item.price}</span> ریال
          </div>
          <div className={packageClass}>
            بسته بندی :<span>{packaging ? packaging.value : 'مشخص نشده'}</span>
          </div>
          <div className={weightClass}>
            وزن :<span>{item.weight}</span> کیلوگرم
          </div>
          <div className={timerClass}>
            <div className={timerTitleClass}>
              <CountdownTimer targetDate={targetDate} />
            </div>
            <span>زمان باقیمانده </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDetails;
