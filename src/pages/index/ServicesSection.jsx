import React from "react";
import styles from "./ServicesSection.module.css";
import BackgroundCircles from "./BackgroundCircles"; // مسیر درست کامپوننت
import bg_trade from "../../assets/images/bg_trade.jpg";
import bg_transport from "../../assets/images/bg_transport.jpg";
import bg_service from "../../assets/images/bg_service.jpg";
import bg_learn from "../../assets/images/bg_learn.jpg";

const servicesData = [
  {
    title: "خدمات",
    description:
      "شامل آگهی نامه تخصصی کاریابی و تمام نیازمندی های حوزه خرما با نگاه بومی و جامع",
    imageUrl:bg_service,
    position: "bottom-right",
    titlePosition: "left",
    descriptionPosition: "left",
    targetId: "servicesSection",  // اضافه کردن id مرتبط
  },
  {
    title: "تجارت",
    description:
      "با نگاهی تخصصی به بازار عمده و همچنین رفع نیاز فروش داخلی بصورت خرد",
    imageUrl:bg_trade,
    position: "bottom-left",
    titlePosition: "right",
    descriptionPosition: "right",
    targetId: "tradeSection", // اضافه کردن id مرتبط
  },
  {
    title: "حمل و نقل",
    description:
      "سامانه هوشمند ترابری و ترانزیت خرما با سیستم پیشنهاد دهنده قیمت منصفانه به رانندگان",
    imageUrl:bg_transport,
    position: "top-right",
    titlePosition: "leftb",
    descriptionPosition: "leftb",
    targetId: "transportSection", // اضافه کردن id مرتبط
  },
  {
    title: "آموزش",
    description:
      "سامانه آموزشی تخصصی با محوریت خرما با امکان درآمدزایی از تولید محتوا",
    imageUrl:bg_learn,
    position: "top-left",
    titlePosition: "rightb",
    descriptionPosition: "rightb",
    targetId: "educationSection", // اضافه کردن id مرتبط
  },
];

const ServiceCard = ({
  title,
  description,
  imageUrl,
  position,
  titlePosition,
  descriptionPosition,
  targetId,  // دریافت id هدف
}) => (
  <div
    className={`${styles.card} ${styles[position]} ${
      styles[`${titlePosition}-${descriptionPosition}`]
    }`}
    onClick={() => document.getElementById(targetId).scrollIntoView({ behavior: "smooth" })}
  >
    <div
      className={styles.circle}
      style={{ backgroundImage: `url(${imageUrl})` }}
    ></div>
    <div className={styles.content}>
      <h2 className={`${styles.title} ${styles[titlePosition]}`}>{title}</h2>
      <p className={`${styles.description} ${styles[descriptionPosition]}`}>
        {description}
      </p>
    </div>
  </div>
);

const ServicesSection = () => (
  <section id="sectionMain" className={`${styles.section} ${styles.flexCenter}`}>
    <BackgroundCircles />
    <span className={styles.subtitle}>ربو بورس تخصصی خرمای ایران</span>
    <h1 className={styles.title}>
      سامانه ای جامع و خدماتی با محوریت خرمای ایرانی
    </h1>
    <div className={styles.grid}>
      {servicesData.map((service, index) => (
        <ServiceCard key={index} {...service} />
      ))}
    </div>
  </section>
);

export default ServicesSection;
