import React, { useState } from "react";
import ImageCard from "../../components/imageCard/imageCard";
import flag from "../../assets/images/flag.png";
import mazafati from "../../assets/images/mazafati.jpg";
import Switch from "../../components/switch/switch";
import styles from "./RightSidebarDivar.module.css";
import { FaCar, FaHome, FaTools, FaBriefcase, FaCalendar, FaBox, FaShoppingCart, FaCog, FaUser } from 'react-icons/fa';

const RightSidebarDivar = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleCategoryToggle = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div className={styles.sidebarContainer}>
      <ImageCard
        image={mazafati}
        title="محل تبلیغات کد پنج (ماهیانه 5,000,000 تومان)"
        link="https://example.com"
        icon={flag}
      />

      <div className={styles.cardBody}>
        <aside>
          <ul className={styles.categoryList}>
            <li
              className={`${styles.categoryItem} ${expandedCategory === 'employment' ? styles.active : ''}`}
              onClick={() => handleCategoryToggle('employment')}
            >
              <a href="#employment">
                <span className={styles.iconWrapper}>
                  <FaBriefcase className={styles.categoryIcon} />
                </span>
                استخدام و کاریابی
              </a>
              {expandedCategory === 'employment' && (
                <ul className={styles.subCategoryList}>
                  <li className={styles.subCategoryItem}><a href="/s/bam/jobs?type=part-time">کارگر ساده</a></li>
                  <li className={styles.subCategoryItem}><a href="/s/bam/jobs?type=full-time">سرپرست کارگاه</a></li>
                  <li className={styles.subCategoryItem}><a href="/s/bam/jobs?type=freelance">انباردار</a></li>
                  <li className={styles.subCategoryItem}><a href="/s/bam/jobs?type=freelance">نگهبان</a></li>
                  <li className={styles.subCategoryItem}><a href="/s/bam/jobs?type=freelance">حسابدار</a></li>
                  <li className={styles.subCategoryItem}><a href="/s/bam/jobs?type=freelance">راننده لیفتراک</a></li>
                  <li className={styles.subCategoryItem}><a href="/s/bam/jobs?type=freelance">ترخیص کار</a></li>

                </ul>
              )}
            </li>

            <li
              className={`${styles.categoryItem} ${expandedCategory === 'repairs' ? styles.active : ''}`}
              onClick={() => handleCategoryToggle('repairs')}
            >
              <a href="#repairs">
                <span className={styles.iconWrapper}>
                  <FaTools className={styles.categoryIcon} />
                </span>
                تعمیرات تخصصی
              </a>
              {expandedCategory === 'repairs' && (
                <ul className={styles.subCategoryList}>
                  <li className={styles.subCategoryItem}><a href="/s/bam/repairs?type=electrical">سرمایشی و سردخانه </a></li>
                  <li className={styles.subCategoryItem}><a href="/s/bam/repairs?type=plumbing">تجهیزات صنعتی </a></li>
                </ul>
              )}
            </li>

            <li
              className={`${styles.categoryItem} ${expandedCategory === 'consulting' ? styles.active : ''}`}
              onClick={() => handleCategoryToggle('consulting')}
            >
              <a href="#consulting">
                <span className={styles.iconWrapper}>
                  <FaUser className={styles.categoryIcon} />
                </span>
                تجارت و بازرگانی
              </a>
              {expandedCategory === 'consulting' && (
                <ul className={styles.subCategoryList}>
                  <li className={styles.subCategoryItem}><a href="/s/bam/consulting?type=business">مشاوره تخصصی</a></li>
                  <li className={styles.subCategoryItem}><a href="/s/bam/consulting?type=legal">ثبت برند و تجاری سازی</a></li>
                  <li className={styles.subCategoryItem}><a href="/s/bam/consulting?type=legal">نمایشگاه داخلی و خارجی</a></li>
                </ul>
              )}
            </li>

            <li
              className={`${styles.categoryItem} ${expandedCategory === 'dates' ? styles.active : ''}`}
              onClick={() => handleCategoryToggle('dates')}
            >
              <a href="#dates">
                <span className={styles.iconWrapper}>
                  <FaBox className={styles.categoryIcon} />
                </span>
                ملزومات خرما
              </a>
              {expandedCategory === 'dates' && (
                <ul className={styles.subCategoryList}>
                  <li className={styles.subCategoryItem}><a href="/s/bam/dates?type=imported">تجهیزات و ماشین آلات نو</a></li>
                  <li className={styles.subCategoryItem}><a href="/s/bam/dates?type=local">تجهیزات و ماشین آلات دست دوم</a></li>
                  <li className={styles.subCategoryItem}><a href="/s/bam/dates?type=local">سبد خرما </a></li>
                  <li className={styles.subCategoryItem}><a href="/s/bam/dates?type=local">چاپ و بسته بندی  </a></li>
                  <li className={styles.subCategoryItem}><a href="/s/bam/dates?type=local">سایر ملزومات خرما</a></li>
                </ul>
              )}
            </li>

            
          </ul>

          <hr className={styles.divider} />

          <form className={styles.filterForm}>
            <div className={styles.filterSection}>
              <div className={styles.filterTitle}>وضعیت آگهی</div>
              <div className={styles.filterContent}>
                <Switch title="عکس دار" />
                <Switch title="فوری" />
              </div>
            </div>
          </form>

          <hr className={styles.divider} />
        </aside>
      </div>
    </div>
  );
};

export default RightSidebarDivar;
