// src/components/ShopCard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { formatPrice } from "../../components/utils/utils"; // ایمپورت تابع فرمت کردن

import "react-toastify/dist/ReactToastify.css";
import styles from "./shop_card.module.css";
import noPic from "../../assets/images/nopic.png";
import Config from "../../config/config";
import Loading from "../../components/loading";
import ProductModal from "./ProductModal"; // کامپوننت Modal جدید

const ShopCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${Config.baseUrl}/shop/all_products_in_all_shops`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setProducts(res.data);
      } catch (err) {
        console.error("در هنگام دریافت داده‌ها این خطا اتفاق افتاده:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div>
      <ToastContainer className={styles.rtl_diection} />

      {isLoading ? (
        <Loading />
      ) : error ? (
        <p>خطایی در دریافت داده‌ها رخ داده است.</p>
      ) : products.length > 0 ? (
        <div className={styles.wrapper}>
          
            {products.map((product) => (
              <div key={product.id} onClick={() => handleProductClick(product)}>
                <div className={styles.shop_card}>
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
                    <strong>{product.title}</strong>
                  </h1>
                  <div className={styles.category}>
                    <span>{product.category.name} | {product.sub_category.name}</span>
                  </div>
                  <div className={styles.discountPrice}>
                    <strong>فروشگاه :</strong>
                    <span>{product.my_shop}</span>
                  </div>
                  <div className={styles.package}>
                    <strong>بسته بندی :</strong>
                    <span>{product.package.title}</span>
                  </div>
                  <div className={styles.weight}>
                    <strong>وزن :</strong>
                    <span>{formatPrice(product.weight)}</span> کیلوگرم
                  </div>
                  <div className={styles.fillBtnOrange}>
                    <span>
                      <span>{formatPrice(product.discount_price)}</span> ریال
                    </span>
                  </div>
                </div>
              </div>
            ))}
          
        </div>
      ) : (
        <p>هیچ محصولی یافت نشد.</p>
      )}
      {isModalOpen && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ShopCard;
