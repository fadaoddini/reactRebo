import React, { useState } from 'react';
import './filter.css'; 

import topWeight from "../../assets/images/top_weight.png"
import lowWeight from "../../assets/images/low_weight.png"
import vertical from "../../assets/images/vertical.svg"
import horizontal from "../../assets/images/horizontal.svg"


const FilteringBazar = () => {
    const [activeTab, setActiveTab] = useState('weightHighToLow');
    const [displayMode, setDisplayMode] = useState('card'); // 'card' or 'list'

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
      <div className="display-mode-icons">
        <button onClick={() => setDisplayMode('card')} className={`display-mode-button ${displayMode === 'card' ? 'active' : ''}`}>
          <img src={vertical} alt="Card View" />
        </button>
        <button onClick={() => setDisplayMode('list')} className={`display-mode-button ${displayMode === 'list' ? 'active' : ''}`}>
          <img src={horizontal} alt="List View" />
        </button>
      </div>
    </div>
    
  );
};

  
  export default FilteringBazar;