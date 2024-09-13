import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../components/chart/Card";
import styles from "./right.module.css";
import Config from "../../config/config"; // فرض بر این است که Config حاوی baseUrl است
import AlertMessage from "../../components/utils/AlertMessage"; // فرض بر این است که AlertMessage در این مسیر است

const ProductList = ({
  handleReportClick,
  handleMarketClick,
  handleBidsClick,
}) => {
  const [productTypes, setProductTypes] = useState([]); // State برای ذخیره اطلاعات محصولات
  const [isDataAvailable, setIsDataAvailable] = useState(true); // بررسی وجود داده‌ها
  const [errorMessage, setErrorMessage] = useState(""); // برای پیام خطا
  const [showAlert, setShowAlert] = useState(false); // وضعیت برای نمایش AlertMessage

  // تابع دریافت اطلاعات از API
  const fetchProductTypes = async () => {
    try {
      const response = await axios.get(`${Config.baseUrl}/catalogue/all_types`);
      setProductTypes(response.data);

      // بررسی اینکه آیا داده‌ها برای محصولات موجود است یا خیر
      setIsDataAvailable(response.data.length > 0);
    } catch (error) {
      console.error("Error fetching product types:", error);
      setErrorMessage("خطایی در دریافت اطلاعات محصولات رخ داده است.");
      setShowAlert(true);
      setIsDataAvailable(false);
    }
  };

  // درخواست API در زمان بارگذاری کامپوننت
  useEffect(() => {
    fetchProductTypes();
  }, []);

  const handleAlertClose = () => setShowAlert(false); // تابع بستن AlertMessage

  return (
    <div className={styles.custom_dir}>
      <h3 className={styles.tbazar}>تحلیل و گزارش بازار عمده</h3>
      
      {/* نمایش AlertMessage در صورت بروز خطا */}
      {showAlert && <AlertMessage message={errorMessage} onClose={handleAlertClose} isOpen={showAlert} />}

      {isDataAvailable ? (
        productTypes.map((product) => (
          <div key={product.id}>
            <Card
              title={product.title}
              product={product}
              onReportClick={() => handleReportClick(product.id, product.title)}
              onMarketClick={() => handleMarketClick(product.id, product.title)}
              onBidsClick={() => handleBidsClick(product.id, product.title)}
            />
          </div>
        ))
      ) : (
        <p>داده‌ای برای نمایش موجود نیست.</p>
      )}
    </div>
  );
};

export default ProductList;
