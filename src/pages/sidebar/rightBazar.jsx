import React from "react";
import ImageCard from "../../components/imageCard/imageCard";
import Switch from "../../components/switch/switch";
import flag from "../../assets/images/flag.png"
import mazafati from "../../assets/images/mazafati.jpg"

const RightSidebarBazar = () => {
  return (
    <div>
      <ImageCard
        image={mazafati}
        title="   محل تبلیغات کد سه (ماهیانه 5,000,000تومان) "

        link="https://example.com"
        icon={flag}
      />

      <div className="card-body ">
        بزودی تکمیل می شود...
      </div>
    </div>
  );
};

export default RightSidebarBazar;
