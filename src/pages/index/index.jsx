import React, { useEffect, useState } from "react";
import Switch from "../../components/switch/switch";
import axios from "axios";
import FilteringBazar from "../../components/category/filtering";
import ImageCard from "../../components/imageCard/imageCard";
import flag from "../../assets/images/flag.png";
import mazafati from "../../assets/images/mazafati.jpg";
import AdvancedSearch from "../../components/search/AdvancedSearch";
import AdvertisingOne from "../../components/imageCard/advertisingOne";
import Loading from "../../components/loading";
import Config from "../../config/config";
import CardVertical from "../../components/cardBazar/cardVertical";
import CardHorizontal from "../../components/cardBazar/cardHorizontal";

const Index = () => {
  const [displayMode, setDisplayMode] = useState("card"); //card and list display
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let params = {
          sortby: "highestWeight",
          type: "etc",
        };

        const res = await axios.post(
          `${Config.baseUrl}/catalogue/sortby`,
          params,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setItems(res.data);
      } catch (err) {
        console.error("در هنگام دریافت داده ها این خطا اتفاق افتاده :", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="rtl_fa" >خطای پیش آمده : {error.message}</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          <AdvertisingOne
            image={mazafati}
            title=" محل تبلیغات کد دو "
            link="https://example.com"
            icon={flag}
          />

          <AdvancedSearch />
          <FilteringBazar
            displayMode={displayMode}
            setDisplayMode={setDisplayMode}
          />

          <div className="card custom-card margin-top-5">
            {isLoading ? (
              <Loading />
            ) : (
              <div className="card-body">
                {displayMode === "card" ? (
                  <CardVertical items={items} />
                ) : (
                  <CardHorizontal items={items} />
                )}
              </div>
            )}
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card custom-card margin-top-5 ">
            <ImageCard
              image={mazafati}
              title=" محل تبلیغات کد یک "
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
