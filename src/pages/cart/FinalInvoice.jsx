import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import logo from "../../assets/images/logo.png";
import styles from "./style_cart.module.css"; // فرض می‌کنیم که این فایل CSS برای استایل‌های صفحه استفاده می‌شود
import noPic from "../../assets/images/nopic.png";

const FinalInvoice = () => {
  const { orders, shippingCost, customerInfo, storeInfo, isPaid } =
    useContext(CartContext);

  const taxRate = 0.09;
  const commissionRate = 0.05;

  const calculateTotal = () => {
    const itemsTotal = orders.reduce((sum, item) => {
      const discountPrice = item.price - (item.price * item.discount) / 100;
      return sum + discountPrice * item.count;
    }, 0);

    return itemsTotal + shippingCost;
  };

  const itemsTotal = orders.reduce((sum, item) => {
    const discountPrice = item.price - (item.price * item.discount) / 100;
    return sum + discountPrice * item.count;
  }, 0);

  const total = calculateTotal();
  const tax = total * taxRate;
  const commission = total * commissionRate;
  const finalTotal = total + tax + commission;
  const invoiceNumber = Math.floor(Math.random() * 1000000); // فرض می‌کنیم شماره فاکتور تصادفی است
  const today = new Date().toLocaleDateString("fa-IR"); // تاریخ امروز به فرمت شمسی

  return (
    <div className={styles.finalInvoice}>
      <h1>فاکتور نهایی</h1>
      <div className={styles.invoiceHeader}>
        <img src={logo} alt="ربو| بورس خرما" className={styles.logo} />
        <div className={styles.invoiceDetails}>
          <p>
            <strong>تاریخ:</strong> {today}
          </p>
          <p>
            <strong>شماره فاکتور:</strong> {invoiceNumber}
          </p>
        </div>
        <div className={styles.paymentStatus}>
          <span className={isPaid ? styles.paid : styles.unpaid}>
            {isPaid ? "پرداخت شده" : "پرداخت نشده"}
          </span>
        </div>
      </div>
      <div className={styles.customerInfo}>
        <h2>اطلاعات خریدار</h2>
        <p>
          <strong>نام:</strong> {customerInfo.name}
        </p>
        <p>
          <strong>آدرس:</strong> {customerInfo.address}
        </p>
        <p>
          <strong>تلفن:</strong> {customerInfo.phone}
        </p>
        <p>
          <strong>کدپستی:</strong> {customerInfo.postalCode}
        </p>
        <p>
          <strong>شهر:</strong> {customerInfo.city}
        </p>
        <p>
          <strong>محله:</strong> {customerInfo.subCity}
        </p>
        <p>
          <strong>نام گیرنده:</strong> {customerInfo.receiverName}
        </p>
      </div>
      <div className={styles.storeInfo}>
        <h2>اطلاعات فروشنده</h2>
        <p>
          <strong>نام:</strong> {storeInfo.name}
        </p>
        <p>
          <strong>آدرس:</strong> {storeInfo.address}
        </p>
        <p>
          <strong>تلفن:</strong> {storeInfo.phone}
        </p>
        <p>
          <strong>ایمیل:</strong> {storeInfo.email}
        </p>
      </div>
      <div className={styles.orderSummary}>
        <h2>جزئیات سفارش</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ردیف</th>
              <th>تصویر</th>
              <th>عنوان</th>
              <th>تعداد</th>
              <th>قیمت کالا (ریال)</th>
              <th>درصد تخفیف</th>
              <th>قیمت بعد از تخفیف (ریال)</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              const discountPrice =
                order.price - (order.price * order.discount) / 100;
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={order.image || noPic}
                      alt={order.title}
                      className={styles.productImage}
                      onError={(e) => {
                        e.target.src = noPic;
                      }}
                    />
                  </td>
                  <td>{order.title}</td>
                  <td>{order.count}</td>
                  <td>{order.price.toLocaleString()}</td>
                  <td>{order.discount}%</td>
                  <td>{(discountPrice * order.count).toLocaleString()}</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan="6">هزینه ارسال</td>
              <td>{shippingCost.toLocaleString()} ریال</td>
            </tr>
            <tr>
              <td colSpan="6">جمع کل</td>
              <td>{itemsTotal.toLocaleString()} ریال</td>
            </tr>
            <tr>
              <td colSpan="6">مالیات (9%)</td>
              <td>{tax.toLocaleString()} ریال</td>
            </tr>
            <tr>
              <td colSpan="6">کمسیون سامانه ربو (5%)</td>
              <td>{commission.toLocaleString()} ریال</td>
            </tr>
            <tr>
              <td colSpan="6">جمع نهایی</td>
              <td>
                <strong>{finalTotal.toLocaleString()} ریال</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.actions}>
        <button onClick={() => window.print()} className={styles.printButton}>
          چاپ فاکتور (PDF)
        </button>
      </div>
    </div>
  );
};

export default FinalInvoice;
