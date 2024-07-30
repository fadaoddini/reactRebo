import React, { useState } from 'react';
import './filter.css'; 

import topWeight from "../../assets/images/top_weight.png"
import lowWeight from "../../assets/images/low_weight.png"


const FilteringBazar = () => {
    const [activeTab, setActiveTab] = useState('weightHighToLow');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="filter-tabs">
      <i className="bi-sort-down"></i>
      <span className="filter-tabs-title">مرتب‌سازی براساس:</span>
      <ul className="filter-tabs-list">
        
        
        <li className={`filter-tab ${activeTab === 'weightHighToLow' ? 'active' : ''}`}>
          <button className="filter-button" onClick={() => handleTabClick('weightHighToLow')}>
          <img src={topWeight} alt=""/>
            <span>بیشترین وزن</span>
          </button>
        </li>
        <li className={`filter-tab ${activeTab === 'weightLowToHigh' ? 'active' : ''}`}>
          <button className="filter-button" onClick={() => handleTabClick('weightLowToHigh')}>
          <img src={lowWeight} alt=""/>
            <span>کمترین وزن</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

  
  export default FilteringBazar;