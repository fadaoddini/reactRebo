import React, { useState, useEffect } from "react";
import AdvertisingOne from "../../components/imageCard/advertisingOne";
import mazafati from "../../assets/images/mazafati.jpg";
import flag from "../../assets/images/flag.png";
import RightSidebarDivar from "../sidebar/rightDivar";
import DivarItem from "../../components/divar/DivarItem";

import ModalWithForm from "./ModalWithForm"; // اضافه کردن مودال
import styles from "./Divar.module.css"; // فایل استایل را اضافه کنید

const Divar = () => {
  // تعریف آرایه‌ای از آیتم‌ها برای نمایش در DivarItem
  const [items, setItems] = useState([
    {
      id: 1,
      title: "عنوان آگهی 1",
      bottomText: "متن پایین 1",
      imageSrc: "https://via.placeholder.com/180", // لینک تصویر
      expiryDate: "2024-08-15T00:00:00", // تاریخ انقضا
    },
    {
      id: 2,
      title: "عنوان آگهی 2",
      bottomText: "متن پایین 2",
      imageSrc: "https://via.placeholder.com/180", // لینک تصویر
      expiryDate: "2024-08-20T00:00:00", // تاریخ انقضا
    },
    {
      id: 3,
      title: "عنوان آگهی 3",
      bottomText: "متن پایین 3",
      imageSrc: "https://via.placeholder.com/180", // لینک تصویر
      expiryDate: "2024-08-25T00:00:00", // تاریخ انقضا
    },
    {
      id: 4,
      title: "عنوان آگهی 4",
      bottomText: "متن پایین 4",
      imageSrc: "https://via.placeholder.com/180", // لینک تصویر
      expiryDate: "2024-08-30T00:00:00", // تاریخ انقضا
    },
  ]);

  // وضعیت لاگین
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // بررسی وضعیت لاگین با استفاده از localStorage
  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          <AdvertisingOne
            image={mazafati}
            title="محل تبلیغات کد شش (ماهیانه 10,000,000 تومان)"
            link="https://example.com"
            icon={flag}
          />
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              {/* پاس دادن آرایه items به کامپوننت DivarItem */}
              <DivarItem items={items} />
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card custom-card margin-top-5">
            <RightSidebarDivar />
          </div>
        </div>
      </div>

      {/* دکمه شناور که فقط در صورت لاگین بودن نمایش داده می‌شود */}
      {isLoggedIn && (
        <button className={styles.floatingButton} onClick={openModal}>
          ثبت آگهی
        </button>
      )}

      {/* مودال برای ارسال آگهی جدید */}
      <ModalWithForm isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Divar;
