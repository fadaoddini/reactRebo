import React, { useState } from "react";
import CreateTransportModal from "../../pages/transport/CreateTransportModal"; // Import the modal component
import styles from "./style.module.css"

const HeavyVehicleRegisterButton = ({ transportTypes, onTransportAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button className={styles.buttonPrimary} onClick={openModal}>
      ثبت نام خودروی سنگین
    </button>
    <span className={styles.buttonDescription}>
        بعد از ثبت نام خودروهای خود روی هر کدام کلیک کرده و درخواست بار ثبت کنید
      </span>
      {isModalOpen && (
        <CreateTransportModal
          onClose={closeModal}
          transportTypes={transportTypes}
          onTransportAdded={onTransportAdded}
        />
      )}
    </div>
  );
};

export default HeavyVehicleRegisterButton;
