// BackgroundCircles.js
import React from 'react';
import styles from './FeatureCircles.module.css'; // مسیر صحیح فایل CSS ماژول

const BackgroundCircles = () => {
  return (
    <div className={styles.featureAppImg}>
      <div className={styles.circle1}></div>
      <div className={styles.circle2}></div>
      <div className={styles.circle3}></div>
    </div>
  );
};

export default BackgroundCircles;
