import React from "react";
import CardReboBazar from "../../components/cards/cardReboBazar";
import CardWithSearch from "../../components/search/cardWhitSearch"
import Switch from "../../components/switch/switch";
import FilteringBazar from "../../components/category/filtering";
import ImageCard from "../../components/imageCard/imageCard";
import flag from "../../assets/images/flag.png";
import mazafati from "../../assets/images/mazafati.jpg";
import rabi from "../../assets/images/rabi.jpg";
import darage2 from "../../assets/images/darage2.jpg";

const Index = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          <CardWithSearch />
          <FilteringBazar />
          <div className="card custom-card margin-top-5">
            <div className="card-body">
              <CardReboBazar />
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card custom-card margin-top-5 ">
            <ImageCard
              image={mazafati}
              title="انواع خرمای مضافتی"
              link="https://example.com"
              icon={flag}
            />
            <ImageCard
              image={rabi}
              title="انواع خرمای ربی"
              link="https://example.com"
              icon={flag}
            />
            <ImageCard
              image={darage2}
              title="انواع خرمای درجه دو"
              link="https://example.com"
              icon={flag}
            />

            <div className="card-body ">
              <Switch title=" فروشنده" />
              <Switch title=" خریدار" />
              <Switch title=" ارسال رایگان" />
              <Switch title="شرکتی" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
