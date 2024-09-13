import React from "react";
import ServicesSection from "./ServicesSection";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import ScrollDots from "./ScrollDots"; // کامپوننت نقاط اسکرول

const sectionsData = [
  { id: "sectionMain", title: "ربو" },
  { id: "tradeSection", title: "تجارت" },
  { id: "servicesSection", title: "خدمات" },
  { id: "educationSection", title: "آموزش" },
  { id: "transportSection", title: " حمل و نقل" },
];

const Index = () => {
  return (
    <div>
      <ScrollDots sections={sectionsData} />
      <ServicesSection />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </div>
  );
};

export default Index;
