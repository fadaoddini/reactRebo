import React, { useState } from "react";
import CardVertical from "./cardVertical";
import styles from "./tabs.module.css";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("Mozafati");

  const renderContent = () => {
    switch (activeTab) {
      case "Mozafati":
        return <CardVertical category="Mozafati" />;
      case "Rabbi":
        return <CardVertical category="Rabbi" />;
      case "Piarom":
        return <CardVertical category="Piarom" />;
      case "Others":
        return <CardVertical category="Others" />;
      default:
        return <CardVertical category="Mozafati" />;
    }
  };

  return (
    <div className={styles.tabs}>
      <div className={styles.tabList}>
        <button className={activeTab === "Mozafati" ? styles.active : ""} onClick={() => setActiveTab("Mozafati")}>خرمای مضافتی</button>
        <button className={activeTab === "Rabbi" ? styles.active : ""} onClick={() => setActiveTab("Rabbi")}>خرمای ربی</button>
        <button className={activeTab === "Piarom" ? styles.active : ""} onClick={() => setActiveTab("Piarom")}>خرمای پیارم</button>
        <button className={activeTab === "Others" ? styles.active : ""} onClick={() => setActiveTab("Others")}>سایر</button>
      </div>
      <div className={styles.tabContent}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Tabs;
