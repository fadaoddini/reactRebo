import React from "react";
import styles from "./ScrollDots.module.css"; // استایل نقاط اسکرول

const ScrollDots = ({ sections }) => {
  return (
    <div className={styles.scrollDotsContainer}>
      {sections.map((section, index) => (
        <a
          key={index}
          href={`#${section.id}`}
          className={styles.dot}
          title={section.title}
        >
          <div className={styles.badge}>{section.title}</div>
        </a>
      ))}
    </div>
  );
};

export default ScrollDots;
