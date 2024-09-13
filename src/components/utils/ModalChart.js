import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ModalChart.module.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import Config from '../../config/config'; // فرض بر این است که Config در این فایل است
import AlertMessage from '../../components/utils/AlertMessage'; // فرض بر این است که AlertMessage در این مسیر است

// Register Chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const Modal = ({ isOpen, onClose, productId, title }) => {
  const [timePeriod, setTimePeriod] = useState('7'); // حالت برای بازه زمانی، پیش‌فرض 7 روز
  const [priceData, setPriceData] = useState({
    minPrices: [],
    maxPrices: [],
    dates: [],
    priceAvg: 0,
    priceMax: 0,
    priceMin: 0,
    bazarCount: 0,
  });
  const [errorMessage, setErrorMessage] = useState(''); // برای پیام خطا

  useEffect(() => {
    if (isOpen && productId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${Config.baseUrl}/catalogue/statistic/api/${productId}/`, {
            params: { days: timePeriod },
          });

          const data = response.data;

          if (data && data.min_prices.length > 0) {
            setPriceData({
              minPrices: data.min_prices,
              maxPrices: data.max_prices,
              dates: data.dates,
              priceAvg: data.price_avg,
              priceMax: data.price_max,
              priceMin: data.price_min,
              bazarCount: data.bazar_count,
            });
            setErrorMessage(''); // پاک کردن پیام خطا در صورت دریافت داده
          } else {
            setErrorMessage('متاسفانه داده‌ای برای این نوع خرما به ثبت نرسیده است.');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setErrorMessage('مشکلی در بارگذاری داده‌ها وجود دارد.');
        }
      };

      fetchData();
    }
  }, [isOpen, productId, timePeriod]);

  if (!isOpen) return null;

  const data = {
    labels: priceData.dates,
    datasets: [
      {
        label: 'پایین‌ترین قیمت',
        data: priceData.minPrices,
        fill: false,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 2,
      },
      {
        label: 'بالاترین قیمت',
        data: priceData.maxPrices,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'تاریخ‌ها',
          font: {
            family: "shabnam",
            size: 16,
          },
        },
        ticks: {
          font: {
            family: "shabnam",
            size: 12,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'قیمت',
          font: {
            family: "shabnam",
            size: 16,
          },
        },
        ticks: {
          font: {
            family: "shabnam",
            size: 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            family: "shabnam",
            size: 14,
          },
        },
      },
      tooltip: {
        bodyFont: {
          family: "shabnam",
          size: 12,
        },
      },
    },
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>x</button>
        <div className={styles.buttonGroup}>
          <button 
            className={styles.timeButton}
            onClick={() => setTimePeriod('7')}
          >
            نمایش ۷ روز
          </button>
          <button 
            className={styles.timeButton}
            onClick={() => setTimePeriod('30')}
          >
            نمایش ۳۰ روز
          </button>
        </div>
        {errorMessage ? (
          <AlertMessage message={errorMessage} onClose={() => setErrorMessage('')} isOpen={!!errorMessage} />
        ) : (
          <Line data={data} options={options} />
        )}
        <div className={styles.statsSummary}>
          <p>میانگین قیمت: {priceData.priceAvg}</p>
          <p>بالاترین قیمت: {priceData.priceMax}</p>
          <p>پایین‌ترین قیمت: {priceData.priceMin}</p>
          <p>تعداد بازارها: {priceData.bazarCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
