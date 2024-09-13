import React, { createContext, useState } from 'react';

export const AddToCartContext = createContext();

export const AddToCartProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addToCart = (product, count) => {
    setOrders((prevOrders) => {
      const existingOrder = prevOrders.find(order => order.id === product.id);
      if (existingOrder) {
        const newCount = existingOrder.count + count;
        if (newCount > product.maxCount) {
          // اگر تعداد جدید بیشتر از موجودی باشد، هشدار بدهید
          return prevOrders; // هیچ تغییری در سفارشات انجام ندهید
        } else {
          return prevOrders.map(order =>
            order.id === product.id ? { ...order, count: newCount } : order
          );
        }
      } else {
        if (count > product.maxCount) {
          // اگر تعداد جدید بیشتر از موجودی باشد، هشدار بدهید
          return prevOrders; // هیچ تغییری در سفارشات انجام ندهید
        } else {
          return [...prevOrders, { ...product, count }];
        }
      }
    });
  };

  return (
    <AddToCartContext.Provider value={{ orders, addToCart }}>
      {children}
    </AddToCartContext.Provider>
  );
};
