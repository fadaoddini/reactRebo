import React from 'react';
import styles from './Section.module.css';
import transport from '../../assets/images/transport.jpg';

const Section4 = () => {
  return (
    <section id="transportSection" className={`${styles.section} ${styles.leftSection}`}>
      <div className={styles.imageWrapper}>
        <img src={transport} alt="حمل و نقل در ربو" className={styles.image} />
      </div>
      <div className={styles.contentWrapper}>
        <h2>حمل و نقل در سامانه ربو</h2>
        <p>
          سامانه "ربو" امکاناتی پیشرفته برای مدیریت ترانزیت و حمل و نقل بار را در اختیار تاجرین و رانندگان قرار می‌دهد. در این سامانه، عملیات درخواست بارگیری و اعلام آمادگی برای حمل و نقل به صورت هوشمند انجام می‌شود.
        </p>
        <p>
          رانندگان می‌توانند پیش از ورود به شهر بم، درخواست بارگیری خود را ثبت کرده و اعلام آمادگی کنند. این فرآیند به صورت آنلاین و با بهره‌گیری از اطلاعات دقیق مبدا، مقصد، مسافت و وزن بار انجام می‌شود.
        </p>
        <p>
          سامانه "ربو" همچنین با ارائه پیشنهادات قیمت منصفانه بر اساس عوامل مذکور، به رانندگان کمک می‌کند تا با اطمینان بیشتری برای بارگیری اقدام کنند و بهترین قیمت ممکن را دریافت کنند.
        </p>
        <p>
          این سامانه به رانندگان امکان می‌دهد تا با ثبت درخواست‌های خود به سرعت و به‌صورت کارآمد، عملیات حمل و نقل را مدیریت کنند و از ظرفیت‌های موجود در بازار ترانزیت بهره‌برداری کنند.
        </p>
      </div>
    </section>
  );
};

export default Section4;