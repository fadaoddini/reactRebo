import React, { useState } from "react";
import { formatPrice } from "../../../components/utils/utils"; 
import Config from "../../../config/config";
import nopic from "../../../assets/images/nopic.png";
import styles from "./active.module.css"; 
import EditModalProduct from "../EditModalProduct";
import ImageSlider from "../../../components/utils/ImageSlider/ImageSlider"; // ایمپورت جدید

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
    console.log("تصاویر جدید: ", e.target.files);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log("ویرایش محصول: ", formData);
    handleToggleEditModal();
  };

  const images = product.images.length > 0
    ? product.images.map(img => `${Config.baseUrl}${img.image}`)
    : [nopic];

  return (
    <>
      <div className={styles.productCard}>
        <div className={styles.productImageWrapper}>
          <ImageSlider images={images} /> {/* استفاده از اسلایدر */}
          {product.discount > 0 && (
            <span className={styles.discountBadge}>{product.discount} % 
            تخفیف </span>
          )}
          <span className={styles.categoryBadge}>{product.category.name}</span>
          <span className={styles.subCategoryBadge}>{product.sub_category.name}</span>
        </div>

        <div className={styles.productDetails}>
          <h5 className={styles.productTitle}>{product.title}</h5>
          

          <div className={styles.extraDetails}>
          <p className={styles.productItem}>
            <strong>قیمت: </strong>
            <span className={styles.striked}> {formatPrice(product.price)} </span> (<span className={styles.number}> {formatPrice(product.discount_price)} </span>)
            ریال
          </p>
          
          <p className={styles.productItem}>
            <strong>موجودی: </strong>
            <span className={styles.number}>{formatPrice(product.number_exist)}</span> بسته
          </p>
          <p className={styles.productItem}>
            <strong>وزن هر بسته : </strong>
            <span className={styles.number}>{formatPrice(product.weight)}</span> کیلوگرم
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

      <EditModalProduct
        isOpen={isEditModalOpen}
        toggleModal={handleToggleEditModal}
        handleSubmit={handleEditSubmit}
        handleChange={handleInputChange}
        handleFileChange={handleFileChange}
        formData={formData}
        productData={product}
        productImages={product.images}
      />
    </>
  );
};

export default ProductCard;
