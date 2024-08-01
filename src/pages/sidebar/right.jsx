import React from "react";
import ImageCard from "../../components/imageCard/imageCard";
import Switch from "../../components/switch/switch";
import flag from "../../assets/images/flag.png"
import mazafati from "../../assets/images/mazafati.jpg"

const RightSidebar = () => {
  return (
    <div>
      <ImageCard
        image={mazafati}
        title="   محل تبلیغات کد یک (ماهیانه 5,500,000تومان) "
        link="https://example.com"
        icon={flag}
      />

      <div className="card-body rtl_fa ">
         بزودی تکمیل می شود ...
      </div>
    </div>
  );
};

export default RightSidebar;
