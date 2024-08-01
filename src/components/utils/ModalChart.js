import React, { useState } from 'react';
import styles from './ModalChart.module.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import moment from 'jalali-moment'; // استفاده از کتابخانه برای تاریخ شمسی

// Register Chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const Modal = ({ isOpen, onClose }) => {
  const [timePeriod, setTimePeriod] = useState('7'); // حالت برای بازه زمانی، پیش‌فرض 7 روز

  if (!isOpen) return null;

  // تابع برای تولید تاریخ‌های شمسی
  const getShamsiDates = (days) => {
    const today = moment();
    const dates = [];
    for (let i = days - 1; i >= 0; i--) {
      dates.push(today.clone().subtract(i, 'days').format('jYYYY/jMM/jDD'));
    }
    return dates;
  };

  // داده‌ها برای بازه‌های زمانی مختلف
  const data = {
    labels: timePeriod === '7' ? getShamsiDates(7) : getShamsiDates(30),
    datasets: [
      {
        label: 'پایین‌ترین قیمت',
        data: timePeriod === '7' ? [60, 55, 70, 65, 50, 45, 40] : [60, 55, 70, 65, 50, 45, 40, 42, 47, 50, 52, 54, 55, 58, 60, 62, 63, 65, 67, 69, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88],
        fill: false,
        backgroundColor: 'rgba(255,99,132,0.2)', // رنگ پس‌زمینه
        borderColor: 'rgba(255,99,132,1)', // رنگ خط
        borderWidth: 2,
      },
      {
        label: 'بالاترین قیمت',
        data: timePeriod === '7' ? [70, 65, 85, 80, 60, 55, 50] : [70, 65, 85, 80, 60, 55, 50, 52, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)', // رنگ پس‌زمینه
        borderColor: 'rgba(75,192,192,1)', // رنگ خط
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
            family: "shabnam", // نام فونت سفارشی
            size: 16, // اندازه فونت
          },
        },
        ticks: {
          font: {
            family: "shabnam", // نام فونت سفارشی
            size: 12, // اندازه فونت
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'قیمت',
          font: {
            family: "shabnam", // نام فونت سفارشی
            size: 16, // اندازه فونت
          },
        },
        ticks: {
          font: {
            family: "shabnam", // نام فونت سفارشی
            size: 12, // اندازه فونت
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            family: "shabnam", // نام فونت سفارشی
            size: 14, // اندازه فونت
          },
        },
      },
      tooltip: {
        bodyFont: {
          family: "shabnam", // نام فونت سفارشی
          size: 12, // اندازه فونت
        },
      },
    },
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>x</button>
        {/* <h2>نمودار روند قیمت</h2> */}
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
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Modal;
