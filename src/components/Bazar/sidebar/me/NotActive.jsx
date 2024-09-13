// src/components/NotPay.js

import React, { useState, useEffect } from "react";
import axios from 'axios';
import Config from '../../../../config/config';
import nopic from '../../../../assets/images/nopic.png';
import styles from "./NotPay.module.css";

const NotPay = () => {
  const [products, setProducts] = useState([]);
  const jwtToken = sessionStorage.getItem('accessToken');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post(
          `${Config.baseUrl}/catalogue/product_not_active_me/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [jwtToken]);

  

  return (
    <div>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className={styles.boxCardSingle}>
            <div className={styles.boxCardInner}>
              <img
                src={product.images && product.images.length > 0 ? `${Config.baseUrl}${product.images[0].image}` : nopic}
                alt="Product"
                className={styles.productImage}
              />
              <div className={styles.productDetails}>
                <div className={styles.productName}>{product.name_type}</div>
                <div className={styles.title2}>
                  قیمت :
                  <span className={styles.productPrice}> {product.price} </span>
                  ریال
                </div>
                <div className={styles.title2}>
                  وزن :
                  <span className={styles.productPrice}> {product.weight} </span>
                  کیلوگرم
                </div>
                <div
                  className={`${styles.productBadge} ${product.sell_buy === 2 ? styles.sell : styles.buy}`}
                >
                  {product.sell_buy === 1 ? "فروش" : "خرید"}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>محصولی پیدا نشد</div>
      )}
    </div>
  );
};

export default NotPay;
