import React from 'react';
import { Link } from 'react-router-dom';
import styles from './filter.module.css';

import vertical from "../../assets/images/vertical.svg";
import horizontal from "../../assets/images/horizontal.svg";

const FilteringBazar = ({ displayMode, setDisplayMode, selectedCategory }) => {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.breadcrumbs}>
        <Link to="/" className={styles.breadcrumbItem}>خانه</Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <Link to="/bazar" className={styles.breadcrumbItem}>بازار</Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <Link to="/market/category" className={styles.breadcrumbItem}>
          {selectedCategory}
        </Link>
      </div>
      <div className={styles.displayModeIcons}>
        <button
          onClick={() => setDisplayMode('card')}
          className={`${styles.displayModeButton} ${displayMode === 'card' ? styles.active : ''}`}
        >
          <img src={horizontal} alt="Card View" />
        </button>
        <button
          onClick={() => setDisplayMode('list')}
          className={`${styles.displayModeButton} ${displayMode === 'list' ? styles.active : ''}`}
        >
          <img src={vertical} alt="List View" />
        </button>
      </div>
    </div>
  );
};

export default FilteringBazar;
