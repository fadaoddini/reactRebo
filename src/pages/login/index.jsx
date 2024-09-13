import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';
import Config from '../../config/config';
import logo from '../../assets/images/logo.png'

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [toast, setToast] = useState({ message: '', type: '' });
  const navigate = useNavigate();
  
  useEffect(() => {
    // بررسی وجود توکن در sessionStorage
    if (sessionStorage.getItem('accessToken')) {
      navigate('/'); // هدایت به صفحه اصلی اگر توکن وجود دارد
    }
  }, [navigate]);

  const handleChange = (e) => {
    const value = e.target.value;

    if (toast.message) {
      setToast({ message: '', type: '' });
    }

    if (/^\d{0,9}$/.test(value)) {
      setMobile(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const mobileNumber = '09' + mobile;
    const mobileRegex = /^09\d{9}$/;

    if (!mobileRegex.test(mobileNumber)) {
      setToast({ message: 'شماره موبایل باید با "09" شروع شود و 11 رقم باشد.', type: 'error' });
      return;
    }

    try {
      const response = await axios.post(
        `${Config.baseUrl}/login/sendOtp`,
        { mobile: mobileNumber },
        { headers: { "Content-Type": "application/json" } }
      );

      const { status } = response.data;

      if (status === 'ok') {
        setToast({ message: `کد تأیید برای شماره ${mobileNumber} ارسال شد.`, type: 'success' });
        navigate('/verify', { state: { mobile: mobileNumber } });
      } else {
        setToast({ message: 'مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.', type: 'error' });
      }
    } catch (error) {
      console.error('Error:', error);
      setToast({ message: 'خطایی رخ داده است، لطفاً دوباره تلاش کنید.', type: 'error' });
    }
  };

  return (
    <div className={styles.form_wrapper}>
      <div className={styles.form_container}>
        <img src={logo} alt="rebo" className={styles.logo} />
        <h1>ورود</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.input_container}>
            <span className={styles.fixed_text}>09</span>
            <input
              type="text"
              value={mobile}
              onChange={handleChange}
              maxLength="9"
              className={`${styles.input} ${toast.message && !/^0[0-9]{9}$/.test('09' + mobile) ? styles.input_error : ''}`}
              placeholder="*******"
            />
          </div>
          <button type="submit">ارسال</button>
        </form>
        {toast.message && (
          <div className={`${styles.toast} ${toast.type === 'error' ? styles.error : styles.success}`}>
            {toast.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
