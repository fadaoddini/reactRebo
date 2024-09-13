import React from 'react';
import styles from './CardWithSearch.module.css'; // اطمینان حاصل کنید که مسیر درست است
import search from '../../assets/images/search.png'

const CardWithSearch = () => {
  return (
    <div className={styles.card}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="جستجو..."
          className={styles.searchInput}
        />
        <button className={styles.searchButton}>
          <img src={search} alt="Search" className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default CardWithSearch;
