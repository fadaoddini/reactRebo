import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useBidContext } from '../../pages/bazar/BidContext';
import styles from './style_card_bazar_horizontal.module.css';
import CountdownTimer from '../timer/CountdownTimer';
import clock from '../../assets/images/clock.png';
import Config from '../../config/config';
import nopic from '../../assets/images/nopic.png';
import ModalBider from '../utils/ModalBider';
import ModalDetails from '../utils/ModalProduct';
import AlertMessage from '../utils/AlertMessage'; // اضافه کردن کامپوننت هشدار

const CardHorizontal = ({ items, onNumBidUpdate }) => {
  const [itemList, setItemList] = useState(items); // ذخیره آیتم‌ها به عنوان state
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [message, setMessage] = useState('در حال بررسی وضعیت پیشنهاددهنده...');
  const [isAlertOpen, setIsAlertOpen] = useState(false); // وضعیت نمایش هشدار
  const [numBid, setNumBid] = useState(0); // ذخیره تعداد پیشنهادات باقی‌مانده
  const { bids } = useBidContext(); // دریافت bids از Context
  const jwtToken = sessionStorage.getItem('accessToken'); // دریافت توکن JWT

  useEffect(() => {
    const checkBidPermission = async () => {
      try {
        const response = await axios.get(`${Config.baseUrl}/bid/check_bid/`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        });
        if (response.data.status === 'success') {
          setMessage(`تبریک می گوییم، شما می توانید ${response.data.num_bid} پیشنهاد ثبت کنید`);
          setNumBid(response.data.num_bid);
        } else {
          setMessage('متاسفانه شما اجازه ثبت پیشنهاد را ندارید ابتدا باید پیشنهاد دهنده شوید');
        }
      } catch (error) {
        setMessage('شما در حال حاضر امکان ثبت پیشنهاد را ندارید، لطفا ابتدا پیشنهاد دهنده شوید');
      }
    };
    checkBidPermission();
  }, [jwtToken]); // وابستگی به jwtToken برای انجام درخواست مجدد در صورت تغییر توکن

  const checkBidPermissionAndOpenModal = async (item) => {
    try {
      const response = await axios.get(`${Config.baseUrl}/bid/check_bid/`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
      if (response.data.status === 'success' && response.data.num_bid > 0) {
        openBidModal(item);
      } else {
        setMessage(response.data.message);
        setIsAlertOpen(true);
      }
    } catch (error) {
      setMessage('شما در حال حاضر امکان ثبت پیشنهاد را ندارید، لطفا ابتدا پیشنهاد دهنده شوید');
      setIsAlertOpen(true);
    }
  };

  const updatedItems = itemList.map(item => {
    const updatedBid = bids.find(bid => bid.id === item.id);
    return updatedBid ? updatedBid : item;
  });

  const openBidModal = (item) => {
    setCurrentItem(item);
    setIsBidModalOpen(true);
  };

  const closeBidModal = () => {
    setIsBidModalOpen(false);
    setCurrentItem(null);
  };

  const openDetailsModal = (item) => {
    setCurrentItem(item);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setCurrentItem(null);
  };

  return (
    <div className={styles.wrapper}>
      {updatedItems.map(item => (
        <Card
          key={item.id}
          item={item}
          onBidClick={() => checkBidPermissionAndOpenModal(item)} // بررسی مجوز و سپس باز کردن مودال
          onDetailsClick={() => openDetailsModal(item)}
        />
      ))}
      <ModalBider
        isOpen={isBidModalOpen}
        onClose={closeBidModal}
        currentItem={currentItem}
      />
      <ModalDetails
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        item={currentItem}
      />
      <AlertMessage
        message={message}
        onClose={() => setIsAlertOpen(false)}
        isOpen={isAlertOpen}
      />
    </div>
  );
};

const Card = ({ item, onBidClick, onDetailsClick }) => {
  const packaging = item.attr_value.find(attr => attr.key === 'بسته بندی');
  const imageUrl = item.images.length > 0 ? `${Config.baseUrl}${item.images[0].image}` : nopic;

  const targetDate = new Date(item.finished_time); // تاریخ پایان از API

  const isRed = item.sell_buy === 1;
  const cardStyle = isRed ? styles.card_shop_red : styles.card_shop_green;
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
    <div className={cardStyle} onClick={() => onDetailsClick(item)}>
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

export default CardHorizontal;
