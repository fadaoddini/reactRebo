// BidContext.js
import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import Config from '../../config/config';

// ایجاد Context
const BidContext = createContext();

// ایجاد Provider
export const BidProvider = ({ children }) => {
  const [bids, setBids] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // وضعیت بارگذاری
  const [error, setError] = useState(null); // وضعیت خطا

  // تابع برای اضافه کردن پیشنهاد و بروزرسانی
  const addBid = useCallback(async (bidAmount, productId) => {
    setIsLoading(true);
    setError(null);
    const jwtToken = sessionStorage.getItem('accessToken'); // توکن JWT به صورت پویا
    console.log(jwtToken);
    try {
      // ارسال پیشنهاد جدید
      await axios.post(
        `${Config.baseUrl}/bid/add_bid_api/`,
        {
          price: parseInt(bidAmount),
          product_id: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      // دریافت اطلاعات به‌روز شده محصول
      const updatedProductResponse = await axios.post(
        `${Config.baseUrl}/catalogue/product_by_id_api/`,
        {
          id: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const updatedProduct = updatedProductResponse.data;
      // بروزرسانی لیست پیشنهادات
      setBids((prevBids) => {
        const existingBidIndex = prevBids.findIndex((bid) => bid.id === updatedProduct.id);
        if (existingBidIndex >= 0) {
          const updatedBids = [...prevBids];
          updatedBids[existingBidIndex] = updatedProduct;
          return updatedBids;
        }
        return [...prevBids, updatedProduct];
      });

      console.log('Bid submitted and product updated successfully.');
    } catch (error) {
      console.error('Error submitting bid or fetching updated product:', error.response?.data || error.message);
      setError(error.message); // ذخیره خطا
    } finally {
      setIsLoading(false); // وضعیت بارگذاری را به پایان برسانید
    }
  }, []);

  return (
    <BidContext.Provider value={{ bids, addBid, isLoading, error }}>
      {children}
    </BidContext.Provider>
  );
};

// Custom hook برای استفاده آسان‌تر از Context
export const useBidContext = () => useContext(BidContext);
