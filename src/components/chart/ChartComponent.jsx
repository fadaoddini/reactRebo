import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './chart.module.css';

// ثبت کردن scale و پلاگین‌ها
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartComponent = () => {
  const [timeFrame, setTimeFrame] = useState(30);

  const handleTimeFrameChange = (days) => {
    setTimeFrame(days);
    // اینجا می‌توانید تابع fetchData را برای دریافت داده‌های نمودار فراخوانی کنید
  };

  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Price',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={`${styles.card} ${styles.customCard}`}>
      <div className={styles.cardBody}>
        <div className={styles.dFlex}>
          <p className={`${styles.tx13} ${styles.textMuted}`}>
            نمودار قیمت فروش
            <span id="product_type_name">خرمای مضافتی 6 تا 7 کیلوگرم</span>
          </p>
          <p style={{ marginRight: '10px', color: 'red' }}>
            (
            <span className="text-success tx-15 mr-2">
              تعداد آگهی :
              <span id="bazar_count">2</span>
            </span>
            )
          </p>
        </div>

        <div className="row row-sm mb-3">
          <div className="col-lg-4">
            <div className={`${styles.card} ${styles.bgSuccess} ${styles.customCard} mb-1 text-center`}>
              <div className={styles.cardBody}>
                <span className="tx-13 text-white">
                  بالاترین قیمت
                  <span id="price_max text-white">78000</span>
                  ریال
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className={`${styles.card} ${styles.bgSecondary} ${styles.customCard} mb-1 text-center`}>
              <div className={styles.cardBody}>
                <span className="tx-13 text-white">
                  میانگین قیمت
                  <span id="price_avg text-white">64000.0</span>
                  ریال
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className={`${styles.card} ${styles.bgDanger} ${styles.customCard} mb-0 text-center`}>
              <div className={styles.cardBody}>
                <span className="tx-13 text-white">
                  پایین ترین قیمت
                  <span id="price_min text-white">50000</span>
                  ریال
                </span>
              </div>
            </div>
          </div>
        </div>

        <section className="oc-category-area pt-30 pb-30">
          <div className="container">
            <div className="row wow fadeInUp" style={{ visibility: 'visible', animationName: 'fadeInUp' }}>
              <div className="col-lg-12">
                <div className="section-title1 pos-rel text-center mb-40">
                  <h2 style={{ fontSize: '24px' }} id="title-chart" className="section-main-title1 mb-30">
                    نمودار روند بازار در ماه گذشته
                  </h2>
                  <button onClick={() => handleTimeFrameChange(1)} className={`${styles.btn} ${styles.btnGreen}`}>
                    یک روز گذشته
                  </button>
                  <button onClick={() => handleTimeFrameChange(7)} className={`${styles.btn} ${styles.btnOrange}`}>
                    هفت روز گذشته
                  </button>
                  <button onClick={() => handleTimeFrameChange(30)} className={`${styles.btn} ${styles.btnRed}`}>
                    سی روز گذشته
                  </button>
                </div>
              </div>
            </div>
            <div className="row wow fadeInUp" style={{ visibility: 'visible', animationName: 'fadeInUp' }}>
              <div className="col-xl-12">
                <div className={styles.chartWrapper}>
                  <Line data={data} options={options} className={styles.chartCanvas} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChartComponent;
