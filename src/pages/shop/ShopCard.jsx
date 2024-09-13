// ShopCard.js
import React from 'react';
import PropTypes from 'prop-types';
import Config from '../../config/config';
import styles from './Shop.module.css'; // اطمینان حاصل کنید که مسیر صحیح است

const ShopCard = ({ shopData }) => {
  return (
    <div
      className={
        shopData.is_active
          ? styles.shopCardActive
          : styles.shopCard
      }
    >
      <div className={styles.shopImageWrapper}>
        <img
          src={`${Config.baseUrl}${shopData.image}`} // ترکیب baseUrl با مسیر تصویر
          alt={shopData.name_shop}
          className={styles.shopImage}
        />
      </div>
      <div className={styles.shopDetails}>
        <h5 className={styles.shopName}>{shopData.name_shop}</h5>
        <p className={styles.shopInfo}>
          <strong>مدیر فروشگاه:</strong> {shopData.administrator}
        </p>
        <p className={styles.shopInfo}>
          <strong>موبایل:</strong> {shopData.mobile}
        </p>
        <p className={styles.shopInfo}>
          <strong>آدرس:</strong> {shopData.address}
        </p>
        <p
          className={`${styles.shopStatus} ${
            shopData.is_active
              ? styles.shopStatusActive
              : styles.shopStatusInactive
          }`}
        >
          <strong>وضعیت:</strong> {shopData.is_active ? "فعال" : "غیرفعال"}
        </p>
      </div>
    </div>
  );
};

ShopCard.propTypes = {
  shopData: PropTypes.shape({
    name_shop: PropTypes.string.isRequired,
    administrator: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    is_active: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ShopCard;
