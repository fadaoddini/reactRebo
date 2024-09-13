import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [isAllowed, setIsAllowed] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({});
  const [storeInfo, setStoreInfo] = useState({});

  const updateOrders = (newOrders) => {
    setOrders(newOrders);
  };

  const updateCustomerInfo = (info) => {
    setCustomerInfo(info);
  };

  const updateStoreInfo = (info) => {
    setStoreInfo(info);
  };

  const allowNextStep = () => {
    setIsAllowed(true);
  };

  const restrictAccess = () => {
    setIsAllowed(false);
  };

  const addShippingCost = (cost) => {
    setShippingCost(cost);
  };

  const updateIsPaid = (status) => {
    setIsPaid(status);
  };

  return (
    <CartContext.Provider
      value={{
        orders,
        updateOrders,
        isAllowed,
        allowNextStep,
        restrictAccess,
        shippingCost,
        addShippingCost,
        customerInfo,
        updateCustomerInfo,
        storeInfo,
        updateStoreInfo,
        isPaid,
        updateIsPaid,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
