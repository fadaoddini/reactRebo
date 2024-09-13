import React, { useEffect, useState } from 'react';
import Config from "../../config/config";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './style.module.css';

const PaymentRedirectHandlerBid = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState('در حال بررسی وضعیت پرداخت...');
  const [loading, setLoading] = useState(true);
  const jwtToken = sessionStorage.getItem('accessToken');  // دریافت توکن JWT

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const authority = queryParams.get('Authority');
    const status = queryParams.get('Status');

    if (status === 'OK' && authority) {
      axios.get(`${Config.baseUrl}/bid/payment/verify/`, {
        params: {
          authority,
          status
        },
        headers: {
          Authorization: `Bearer ${jwtToken}`  // ارسال توکن JWT
        }
      }).then(response => {
        if (response.data.status === 'success') {
          setMessage('پرداخت با موفقیت انجام شد. در حال هدایت به صفحه پیشنهادات...');
          setTimeout(() => {
            navigate('/bids'); // تغییر مسیر به صفحه پیشنهادات
          }, 3000); // نمایش پیام به مدت 3 ثانیه قبل از هدایت
        } else {
          setMessage('پرداخت ناموفق بود.');
          setLoading(false);
        }
      }).catch(error => {
        setMessage('خطا در تأیید پرداخت.');
        setLoading(false);
      });
    } else {
      setMessage('اطلاعات پرداخت معتبر نیست.');
      setLoading(false);
    }
  }, [location, navigate, jwtToken]);

  return (
    <div className={styles.card}>
      {loading ? (
        <>
          <div className={styles.spinner}></div>
          <p>{message}</p>
        </>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default PaymentRedirectHandlerBid;
