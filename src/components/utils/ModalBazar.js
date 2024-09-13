import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ModalBazar.module.css'; // فرض کنید استایل‌ها در این فایل موجود است
import Config from '../../config/config'; // فرض کنید Config در این فایل است

const ModalMarket = ({ isOpen, onClose, productId }) => {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productId) {
      const fetchProductData = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(`${Config.baseUrl}/catalogue/bazar/api/${productId}/`);
          setProductData(response.data);
        } catch (error) {
          setError("خطا در بارگذاری داده‌ها.");
          console.error("Error fetching product data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProductData();
    }
  }, [productId]);

  const formatNumber = (number) => {
    return number ? number.toLocaleString() : 'نامشخص';
  };

  const calculateTotal = (price, weight) => {
    return formatNumber(price * weight);
  };

  if (!isOpen) return null;

  const { title, buyers = [], sellers = [] } = productData || {};

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        {loading ? (
          <div>در حال بارگذاری...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className={styles.connectWalletWrapper}>
            <div className={styles.innerBody}>
              <div className={styles.row}>
                <div className={styles.col6}>
                  <span className={`${styles.btn} ${styles.btnSuccess}`}>صف خریداران</span>
                  {buyers.length > 0 ? (
                    buyers.map(buyer => (
                      <div key={buyer.id} className={`${styles.activityWrapper} ${styles.activityWrapperSuccess}`}>
                        <div className={styles.activityMenu}>
                          {calculateTotal(buyer.price, buyer.weight)} تومان
                        </div>
                        <div className={styles.activityMeta}>
                          <a href={`/catalogue/product/detail/${buyer.id}/`}>
                            <span className={styles.textDanger}>
                              {formatNumber(buyer.weight)}
                            </span> کیلوگرم (هر کیلوگرم {formatNumber(buyer.price)} ریال)
                          </a>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>اطلاعاتی وجود ندارد</div>
                  )}
                </div>

                <div className={styles.col6}>
                  <span className={`${styles.btn} ${styles.btnDanger}`}>صف فروشندگان</span>
                  {sellers.length > 0 ? (
                    sellers.map(seller => (
                      <div key={seller.id} className={`${styles.activityWrapper} ${styles.activityWrapperDanger}`}>
                        <div className={styles.activityMenu}>
                          {calculateTotal(seller.price, seller.weight)} تومان
                        </div>
                        <div className={styles.activityMeta}>
                          <a href={`/catalogue/product/detail/${seller.id}/`}>
                            <span className={styles.textDanger}>
                              {formatNumber(seller.weight)}
                            </span> کیلوگرم (هر کیلوگرم {formatNumber(seller.price)} ریال)
                          </a>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>اطلاعاتی وجود ندارد</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalMarket;
