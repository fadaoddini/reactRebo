import React, { useState, useContext, useEffect } from "react";
import QRCode from "qrcode.react";
import { useNavigate } from "react-router-dom";
import moment from "moment-jalaali";
import styles from "./Cart.module.css";
import noPic from "../../assets/images/nopic.png";
import logo from "../../assets/images/logo.png";
import Timeline from "./Timeline";
import { CartContext } from "./CartContext";
import { AddToCartContext } from "../../components/AddToCart/AddToCartContext";

const Cart = () => {
  const { orders, updateOrders, allowNextStep } = useContext(CartContext);
  const { orders: addToCartOrders } = useContext(AddToCartContext);

  useEffect(() => {
    updateOrders(addToCartOrders);
  }, [addToCartOrders, updateOrders]);

  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const taxRate = 0.09;
  const commissionRate = 0.05;
  const today = moment().format("jYYYY/jMM/jDD");

  const calculateTotal = (updatedOrders) => {
    return updatedOrders.reduce((acc, order) => {
      const discountPrice = order.price - (order.price * order.discount) / 100;
      return acc + discountPrice * order.count;
    }, 0);
  };

  const total = calculateTotal(orders);
  const tax = total * taxRate;
  const commission = total * commissionRate;
  const finalTotal = total + tax + commission;

  const invoiceNumber = Math.floor(Math.random() * 1000000);

  const handleDelete = (indexToDelete) => {
    const updatedOrders = orders.filter((_, index) => index !== indexToDelete);
    updateOrders(updatedOrders);
  };

  const handleNextStep = () => {
    allowNextStep();
    setCurrentStep(currentStep + 1);
    navigate("/address");
  };

  return (
    <div className={styles.cart}>
      <Timeline currentStep={1} />
      <div className={styles.topSection}>
        <img src={logo} alt="ربو| بورس خرما" className={styles.logo} />
        <div className={styles.invoiceDetails}>
          <p>
            <strong>تاریخ:</strong> {today}
          </p>
          <p>
            <strong>شماره پیش فاکتور:</strong> {invoiceNumber}
          </p>
        </div>
      </div>
      <div className={styles.header}>
        <div className={styles.qrcode}>
          <QRCode value={`Total: ${finalTotal} ریال`} size={50} />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.customerInfo}>
            <p>
              <strong>نام:</strong> جان دو
            </p>
            <p>
              <strong>آدرس:</strong> تهران، خیابان اصلی، پلاک 12
            </p>
            <p>
              <strong>تلفن:</strong> 09123456789
            </p>
            <p>
              <strong>کدپستی:</strong> 1234567890
            </p>
          </div>
          <div className={styles.storeInfo}>
            <p>
              <strong>فروشگاه:</strong> فروشگاه مثال
            </p>
            <p>
              <strong>آدرس:</strong> بم، خیابان فرعی، پلاک 45
            </p>
            <p>
              <strong>تلفن:</strong> 02123456789
            </p>
            <p>
              <strong>کدپستی:</strong> 1234567890
            </p>
          </div>
        </div>
      </div>
      <div className={styles.tableContainer}>
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
              <th>حذف</th>
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
                  <td>{order.price}</td>
                  <td>{order.discount}%</td>
                  <td>{discountPrice * order.count}</td>
                  <td>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDelete(index)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="7">
                <strong>جمع کل:</strong>
              </td>
              <td>{total} ریال</td>
            </tr>
            <tr>
              <td colSpan="7">
                <strong>مالیات (9%):</strong>
              </td>
              <td>{tax} ریال</td>
            </tr>
            <tr>
              <td colSpan="7">
                <strong>کمسیون سامانه ربو (5%):</strong>
              </td>
              <td>{commission} ریال</td>
            </tr>
            <tr>
              <td colSpan="7">
                <strong>جمع نهایی:</strong>
              </td>
              <td>{finalTotal} ریال</td>
            </tr>
          </tfoot>
        </table>
        <ul className={styles.under_table}>
          <li>این سند پیش فاکتور می باشد و فاقد ارزش قانونی است</li>
          <li>
            لطفا جهت ثبت در سامانه و صدور فاکتور نهایی مراحل خرید را تکمیل
            نمائید
          </li>
        </ul>
      </div>
      <div className={styles.actions}>
        <button className={styles.pdfButton} onClick={() => window.print()}>
          چاپ فاکتور (PDF)
        </button>
        <button className={styles.continueButton} onClick={handleNextStep}>
          تأیید و ادامه
        </button>
      </div>
    </div>
  );
};

export default Cart;
