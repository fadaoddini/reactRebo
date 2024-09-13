import React, { useState } from "react";
import styles from './DivarItem.module.css';
import CountdownTimer from "../timer/CountdownTimer";
import nopic from "../../assets/images/nopic.png";
import ModalDetails from "./ModalDetails"; // اضافه کردن کامپوننت ModalDetails

const DivarItem = ({ items }) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const openDetailsModal = (item) => {
    setCurrentItem(item);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setCurrentItem(null);
  };

  return (
    <div className={styles.wrapper_divar}>
      {items.map((item) => (
        <Card
          key={item.id}
          item={item}
          onDetailsClick={() => openDetailsModal(item)}
        />
      ))}
      {/* استفاده از کامپوننت ModalDetails */}
      <ModalDetails
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        item={currentItem}
      />
    </div>
  );
};

const Card = ({ item, onDetailsClick }) => {
  const imageUrl = item.imageSrc || nopic;
  const targetDate = new Date(item.expiryDate);

  return (
    <div className={styles.card_divar_orange} onClick={() => onDetailsClick(item)}>
      <img src={imageUrl} alt={item.title} />
      <h1>{item.title}</h1>
      <div className={styles.timer_divar_orange}>
        <div className={styles.timer_title_divar_orange}>
          <CountdownTimer targetDate={targetDate} />
        </div>
      </div>
      <div className={styles.bg_number_divar_orange}>
        <span className={styles.text_number_divar_orange}>نردبان</span>
      </div>
      <span className={styles.label_urgent}>فوری</span>
    </div>
  );
};

export default DivarItem;
