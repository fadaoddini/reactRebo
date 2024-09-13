import React, { useState } from "react";
import CreateTransportReqModal from "../../pages/transport/CreateTransportReqModal"; // Import the modal component

const AddReqTransportButton = ({ onRequestAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // تابع برای باز کردن مدال
  const openModal = () => setIsModalOpen(true);

  // تابع برای بستن مدال
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button className="btn btn-primary" onClick={openModal}>
        افزودن درخواست حمل و نقل
      </button>
      {isModalOpen && (
        <CreateTransportReqModal
          onClose={closeModal}
          onRequestAdded={onRequestAdded}
        />
      )}
    </div>
  );
};

export default AddReqTransportButton;
