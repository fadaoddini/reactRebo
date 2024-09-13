import React from 'react';
import styles from './CountProduct.module.css';

const CountProduct = ({ maxCount, count, setCount }) => {
  const increment = () => {
    if (count < maxCount) setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  return (
    <div className={styles.counter}>
      <button className={styles.btnMinus} onClick={decrement}>
        -
      </button>
      <input className={styles.input} type="text" value={count} readOnly />
      <button className={styles.btnPlus} onClick={increment}>
        +
      </button>
    </div>
  );
};

export default CountProduct;
