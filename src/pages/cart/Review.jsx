import React, { useContext, useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { useNavigate } from "react-router-dom";
import moment from "moment-jalaali";
import styles from "./style_cart.module.css";
import Timeline from "./Timeline";
import logo from "../../assets/images/logo.png";
import { CartContext } from "./CartContext";
import noPic from "../../assets/images/nopic.png";

const Review = () => {
  const {
    isAllowed,
    restrictAccess,
    orders,
    shippingCost,
    customerInfo,
    storeInfo,
  } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [commission, setCommission] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [invoiceNumber] = useState(Math.floor(Math.random() * 1000000));
  const navigate = useNavigate();

  const taxRate = 0.09;
  const commissionRate = 0.05;

  useEffect(() => {
    if (!isAllowed) {
      navigate("/");
    } else {
      calculateTotals();
    }

    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [isAllowed, orders, shippingCost, navigate]);

  const calculateTotals = () => {
    const itemsTotal = orders.reduce((sum, item) => {
      const discountPrice = item.price - (item.price * item.discount) / 100;
      return sum + discountPrice * item.count;
    }, 0);

    const totalWithShipping = itemsTotal + shippingCost;
    const calculatedTax = totalWithShipping * taxRate;
    const calculatedCommission = totalWithShipping * commissionRate;
    const calculatedFinalTotal =
      totalWithShipping + calculatedTax + calculatedCommission;

    setTotal(itemsTotal);
    setTax(calculatedTax);
    setCommission(calculatedCommission);
    setFinalTotal(calculatedFinalTotal);
  };

  const handleBackButton = () => {
    window.history.pushState(null, document.title, window.location.href);
  };

  const handlePayment = () => {
    navigate("/finalInvoice");
  };

  return (
    <div className={styles.review}>
      <Timeline currentStep={3} />
      <div className={styles.topSection}>
        <img src={logo} alt="ربو| بورس خرما" className={styles.logo} />
        <div className={styles.invoiceDetails}>
          <p>
            <strong>تاریخ:</strong> {moment().format("jYYYY/jMM/jDD")}
          </p>
          <p>
            <strong>شماره پیش فاکتور:</strong> {invoiceNumber}
          </p>
        </div>
        <div className={styles.qrcode}>
          <QRCode value={`Invoice Number: ${invoiceNumber}`} size={50} />
        </div>
      </div>
      <div className={styles.infoContainer}>
        {customerInfo && (
          <div className={styles.customerInfo}>
            <p>
              <strong>نام مشتری:</strong> {customerInfo.name}
            </p>

            <p>
              <strong>تلفن:</strong> {customerInfo.phone} |{" "}
              <strong>کدپستی:</strong> {customerInfo.postalCode}
            </p>

            <p>
              <strong>شهر:</strong> {customerInfo.city} |{" "}
              <strong>شهرستان:</strong> {customerInfo.subCity}
            </p>
            <p>
              <strong>آدرس:</strong> {customerInfo.address}
            </p>
          </div>
        )}
        {storeInfo && (
          <div className={styles.storeInfo}>
            <p>
              <strong>فروشگاه:</strong> فروشگاه مثال
            </p>
            <p>
              <strong>آدرس:</strong> بم، خیابان فرعی، پلاک 45
            </p>
            <p>
              <strong>تلفن:</strong> 02123456789 | <strong>کدپستی:</strong>{" "}
              1234567890
            </p>
          </div>
        )}
      </div>
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
            <td>{total.toLocaleString()} ریال</td>
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
      <div className={styles.actions}>
        <button
          type="button"
          onClick={() => window.print()}
          className={styles.pdfButton}
        >
          چاپ فاکتور (PDF)
        </button>
        <button
          type="button"
          onClick={handlePayment}
          className={styles.continueButton}
        >
          پرداخت
        </button>
      </div>
    </div>
  );
};

export default Review;
