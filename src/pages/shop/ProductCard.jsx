import React, { useState } from "react";
import { formatPrice } from "../../components/utils/utils"; // ایمپورت تابع فرمت کردن
import Config from "../../config/config";
import nopic from "../../assets/images/nopic.png";
import styles from "./shopStyle.module.css"; // فرض بر این است که این فایل در مسیر مناسب قرار دارد
import EditModalProduct from "./EditModalProduct";


const ProductCard = ({ product }) => {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [formData, setFormData] = useState({
      title: product.title,
      price: product.price,
      discount: product.discount,
      weight: product.weight,
      number_exist: product.number_exist,
      number_send: product.number_send,
      description: product.description,
    });
  
    const handleToggleEditModal = () => {
      setEditModalOpen(!isEditModalOpen);
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleFileChange = (e) => {
      // مدیریت تغییرات فایل (تصویر)
      console.log("تصاویر جدید: ", e.target.files);
    };
  
    const handleEditSubmit = (e) => {
      e.preventDefault();
      console.log("ویرایش محصول: ", formData);
      // اینجا درخواست آپدیت به سرور ارسال می‌شود
      handleToggleEditModal(); // بعد از ارسال موفقیت‌آمیز، مودال بسته می‌شود
    };
  
    const imageUrl =
      product.images.length > 0
        ? `${Config.baseUrl}${product.images[0].image}`
        : nopic;
  
    return (
      <>
        <div className={styles.productCard}>
          <div className={styles.productImageWrapper}>
            <img
              src={imageUrl}
              alt={product.title}
              className={styles.productImage}
            />
            {product.discount > 0 && (
              <span className={styles.discountBadge}>{product.discount}% تخفیف</span>
            )}
          </div>
  
          <div className={styles.productDetails}>
            <h5 className={styles.productTitle}>{product.title}</h5>
            <p className={styles.productItem}>
              <strong>قیمت: </strong>
              <span className={styles.striked}>{formatPrice(product.price)}</span>
              ریال
            </p>
            <p className={styles.productItem}>
              <strong>قیمت با تخفیف: </strong>
              <span className={styles.number}>{formatPrice(product.discount_price)}</span>
              ریال
            </p>
            <p className={styles.productItem}>
              <strong>موجودی: </strong>
              <span className={styles.number}>{formatPrice(product.number_exist)}</span> بسته
            </p>
            <p className={styles.productItem}>
              <strong>وزن: </strong>
              <span className={styles.number}>{formatPrice(product.weight)}</span> کیلوگرم
            </p>
  
            <div className={styles.extraDetails}>
              <p className={styles.productItem}>
                <strong>دسته‌بندی: </strong>
                <span className={styles.number}>{product.category.name}</span>
              </p>
              <p className={styles.productItem}>
                <strong>زیر دسته: </strong>
                <span className={styles.number}>{product.sub_category.name}</span>
              </p>
              <p className={styles.productItem}>
                <strong>نوع بسته‌بندی: </strong>
                <span className={styles.number}>{product.package.title}</span>
              </p>
              <p className={styles.productItem}>
                <strong>محدودیت ارسال: </strong>
                <span className={styles.number}>{formatPrice(product.number_send)}</span> بسته
              </p>
            </div>
  
            <div className={styles.actionButtons}>
              <button
                className={`${styles.button} ${styles.editButton}`}
                onClick={handleToggleEditModal}
              >
                ویرایش
              </button>
              <button className={`${styles.button} ${styles.specialButton}`}>
                ویژه
              </button>
            </div>
          </div>
        </div>
  
        {/* مودال ویرایش */}
        <EditModalProduct
          isOpen={isEditModalOpen}
          toggleModal={handleToggleEditModal}
          handleSubmit={handleEditSubmit}
          handleChange={handleInputChange}
          handleFileChange={handleFileChange}
          formData={formData}
          productData={product} // ارسال اطلاعات محصول برای ویرایش
          productImages={product.images}  // ارسال تصاویر محصول
        />
      </>
    );
  };
  
  export default ProductCard;