import React, { useEffect, useState } from "react";
import axios from "axios";
import FilteringBazar from "../../components/category/filtering";
import flag from "../../assets/images/flag.png";
import mazafati from "../../assets/images/mazafati.jpg";
import AdvancedSearch from "../../components/search/AdvancedSearch";
import AdvertisingOne from "../../components/imageCard/advertisingOne";
import Loading from "../../components/loading";
import Config from "../../config/config";
import CardVertical from "../../components/cardBazar/cardVertical";
import CardHorizontal from "../../components/cardBazar/cardHorizontal";
import RightSidebar from "../sidebar/right";

const Index = () => {
  const [displayMode, setDisplayMode] = useState("card"); // card and list display
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("دسته‌بندی");
  const [categoryOptions, setCategoryOptions] = useState([]); // ذخیره عنوان دسته‌بندی‌ها

  const fetchCategoryOptions = async () => {
    try {
      const response = await axios.get(`${Config.baseUrl}/catalogue/all_types`);
      const data = response.data;
      const formattedOptions = [
        { value: 'None', label: 'همه' },
        ...data.map(item => ({
          value: item.id,
          label: item.title
        }))
      ];
      setCategoryOptions(formattedOptions);
    } catch (err) {
      console.error('Error fetching category options:', err);
    }
  };

  const fetchItems = async (params) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${Config.baseUrl}/api/search`,
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

  useEffect(() => {
    fetchCategoryOptions();
    // بارگذاری اولیه داده‌ها
    fetchItems({
      bazar: "None",
      type: "None",
      price: "None",
    });
  }, []);

  const handleSearch = (searchParams) => {
    fetchItems(searchParams);
    const category = categoryOptions.find(option => option.value === searchParams.type);
    setSelectedCategory(category ? category.label : "دسته‌بندی");
  };

  if (error) {
    return <div className="rtl_fa">خطای پیش آمده : {error.message}</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          <AdvertisingOne
            image={mazafati}
            title="محل تبلیغات کد دو (ماهیانه 12,000,000تومان)"
            link="https://example.com"
            icon={flag}
          />

          <AdvancedSearch onSearch={handleSearch} />
          <FilteringBazar
            displayMode={displayMode}
            setDisplayMode={setDisplayMode}
            selectedCategory={selectedCategory}
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
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
