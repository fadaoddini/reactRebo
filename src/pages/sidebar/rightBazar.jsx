import React from "react";
import ImageCard from "../../components/imageCard/imageCard";
import Switch from "../../components/switch/switch";
import flag from "../../assets/images/flag.png"
import mazafati from "../../assets/images/mazafati.jpg"

const RightSidebarBazar = () => {
  return (
    <div className="margin-top-5">
      <ImageCard
        image={mazafati}
        title="   محل تبلیغات کد 301 (ماهیانه 3,000,000تومان) "

        link="https://example.com"
        icon={flag}
      />
      <ImageCard
        image={mazafati}
        title="   محل تبلیغات کد 302 (ماهیانه 3,000,000تومان) "

        link="https://example.com"
        icon={flag}
      />
      <ImageCard
        image={mazafati}
        title="   محل تبلیغات کد 303 (ماهیانه 3,000,000تومان) "

        link="https://example.com"
        icon={flag}
      />
      <ImageCard
        image={mazafati}
        title="   محل تبلیغات کد 304 (ماهیانه 3,000,000تومان) "

        link="https://example.com"
        icon={flag}
      />
      <ImageCard
        image={mazafati}
        title="   محل تبلیغات کد 305 (ماهیانه 3,000,000تومان) "

        link="https://example.com"
        icon={flag}
      />
      <ImageCard
        image={mazafati}
        title="   محل تبلیغات کد 306 (ماهیانه 3,000,000تومان) "

        link="https://example.com"
        icon={flag}
      />

      
    </div>
  );
};

export default RightSidebarBazar;
