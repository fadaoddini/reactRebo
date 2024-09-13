// src/components/ProductModal.js
import React, { useContext, useState } from 'react';
import styles from './ProductModal.module.css';
import Config from '../../config/config';
import noPic from '../../assets/images/nopic.png';
import { formatPrice } from "../../components/utils/utils"; // ایمپورت تابع فرمت کردن

import CountProduct from './CountProduct';
import { AddToCartContext } from '../AddToCart/AddToCartContext';
import { ToastContainer, toast } from 'react-toastify';

const ProductModal = ({ product, isOpen, onClose }) => {
  const { orders, addToCart } = useContext(AddToCartContext);
  const [count, setCount] = useState(1);

  if (!isOpen) return null; // اگر modal باز نیست، هیچ چیز نمایش نده

  const handleAddToCart = () => {
    const existingOrder = orders.find((order) => order.id === product.id);
    const totalCount = existingOrder ? existingOrder.count + count : count;

    if (totalCount > product.number_send) {
      toast.error("اضافه کردن بیش از حد مجاز امکان پذیر نمی باشد!");
    } else {
      addToCart(product, count);
      toast.success(`${product.title} به سبد خرید اضافه شد!`);
      onClose(); // بستن modal پس از اضافه کردن به سبد خرید
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}> {/* کلیک درون overlay برای بستن modal */}
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن modal هنگام کلیک درون modal
      >
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.shopCard}>
          {product.vije && (
            <div className={styles.number_badge}>
              <div className={styles.text_number_badge}>ویژه</div>
            </div>
          )}
          <img
            src={
              product.images && product.images.length > 0
                ? `${Config.baseUrl}${product.images[0].image}`
                : noPic
            }
            alt={product.title}
          />
          <h1>
            <strong> {product.title}</strong>
          </h1>
          <div className={styles.category}>
            <span> {product.category.name}</span>
          </div>
          <div className={styles.price}>
            <strong>قیمت کالا :</strong>
            <span> {formatPrice(product.price)}</span> ریال
          </div>
          <div className={styles.price}>
            <strong> درصد تخفیف :</strong>
            <span> {product.discount}</span> %
          </div>
          <div className={styles.discountPrice}>
            <strong>قیمت با تخفیف :</strong>
            <span> {formatPrice(product.discount_price)}</span> ریال
          </div>
          <div className={styles.package}>
            <strong>بسته بندی :</strong>
            <span> {product.package.title}</span>
          </div>
          <div className={styles.weight}>
            <strong>وزن :</strong>
            <span> {formatPrice(product.weight)}</span> کیلوگرم
          </div>
          <div className={styles.weight}>
            <strong>محدودیت ارسال :</strong>
            <span>{product.number_send}</span> بسته
          </div>
          <div className={styles.weight}>
            <strong> موجودی :</strong>
            <span> {formatPrice(product.number_exist)}</span> بسته
          </div>
          <div className={styles.weight}>
            <strong>فروشگاه :</strong>
            <span>{product.my_shop}</span> 
          </div>

          <CountProduct
            maxCount={product.number_send}
            count={count}
            setCount={setCount}
          />

          <div className={styles.fillBtnOrange} onClick={handleAddToCart}>
            افزودن به سبد خرید
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
