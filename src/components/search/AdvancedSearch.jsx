import React, { useState } from 'react';
import Select from 'react-select';
import styles from './CardWithSearch.module.css'; // اطمینان حاصل کنید که مسیر درست است

const AdvancedSearch = () => {
    // داده‌ها برای select ها
    const marketOptions = [
      { value: 'buyers', label: 'خریداران' },
      { value: 'sellers', label: 'فروشندگان' },
    ];
  
    const categoryOptions = [
      { value: '1', label: 'خرمای مضافتی زیر 6 کیلو گرم' },
      { value: '2', label: 'خرمای مضافتی 6 تا 6.5 کیلوگرم' },
      { value: '3', label: 'خرمای مضافتی 6.5 تا 7 کیلوگرم' },
      { value: '4', label: 'خرمای مضافتی 7 تا 7.5 کیلوگرم' },
      { value: '5', label: 'خرمای مضافتی 7.5 تا 8 کیلوگرم' },
      { value: '6', label: 'خرمای مضافتی بالای 8 کیلو گرم' },
    ];
  
    const priceOptions = [
      { value: 'top', label: 'بیشترین' },
      { value: 'low', label: 'کمترین' },
    ];
  
    const handleChange = (selectedOption) => {
      console.log('Selected option:', selectedOption);
    };
  
    return (
      <div className={styles.advancedSearchContainer}>
        <Select
          options={marketOptions}
          onChange={handleChange}
          className={`${styles.selectItem} ${styles.selectControl}`}
          classNamePrefix="select"
          isClearable
          placeholder="انتخاب کنید"
        />
        <Select
          options={categoryOptions}
          onChange={handleChange}
          className={`${styles.categorySelectItem} ${styles.selectControl}`}
          classNamePrefix="select"
          isClearable
          placeholder="انتخاب کنید"
        />
        <Select
          options={priceOptions}
          onChange={handleChange}
          className={`${styles.selectItem} ${styles.selectControl}`}
          classNamePrefix="select"
          isClearable
          placeholder="انتخاب کنید"
        />
        <button className={styles.searchButton} type="submit">جستجو</button>
      </div>
    );
  };
  
  export default AdvancedSearch;