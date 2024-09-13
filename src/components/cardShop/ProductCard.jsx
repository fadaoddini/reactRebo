// src/components/ProductCard.js
import React, { useContext } from 'react';
import styles from './shop_card.module.css'; // مسیر صحیح فایل CSS
import Config from '../../config/config';
import noPic from '../../assets/images/nopic.png';
import CountProduct from './CountProduct';
import { AddToCartContext } from '../AddToCart/AddToCartContext';
import { ToastContainer, toast } from 'react-toastify';

const ProductCard = ({ product, productCount, onCountChange }) => {
  const { orders, addToCart } = useContext(AddToCartContext);

  const handleAddToCart = () => {
    const count = productCount;
    const existingOrder = orders.find((order) => order.id === product.id);
    const totalCount = existingOrder ? existingOrder.count + count : count;

    if (totalCount > product.number_send) {
      toast.error("اضافه کردن بیش از حد مجاز امکان پذیر نمی باشد!");
    } else {
      addToCart(product, count);
      toast.success(`${product.title} به سبد خرید اضافه شد!`);
    }
  };

  return (
    <div className={styles.shop_card}>
      {product.vije && (
        <div className={styles.number_badge}>
          <div className={styles.text_number_badge}>ویژه</div>
        </div>
      )}
      <img
        src={product.images && product.images.length > 0
          ? `${Config.baseUrl}${product.images[0].image}`
          : noPic}
        alt={product.title}
      />
      <h1>
        <strong>{product.title}</strong>
      </h1>
      <div className={styles.category}>
        <span>{product.category}</span>
      </div>
      <div className={styles.price}>
        <strong>قیمت کالا :</strong>
        <span>{product.price}</span> ریال
      </div>
      <div className={styles.discountPrice}>
        <strong>قیمت با تخفیف :</strong>
        <span>{product.discount_price}</span> ریال
      </div>
      <div className={styles.package}>
        <strong>بسته بندی :</strong>
        <span>{product.package}</span>
      </div>
      <div className={styles.weight}>
        <strong>وزن :</strong>
        <span>{product.weight}</span> کیلوگرم
      </div>
      <div className={styles.weight}>
        <strong>فروشگاه :</strong>
        <span>{product.my_shop}</span>
      </div>

      <CountProduct
        maxCount={product.number_send}
        count={productCount}
        setCount={(count) => onCountChange(count)}
      />

      <div className={styles.fillBtnOrange} onClick={handleAddToCart}>
        افزودن به سبد خرید
      </div>
    </div>
  );
};

export default ProductCard;
