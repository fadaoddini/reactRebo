import React, { useState, useEffect, useCallback } from "react";
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
import RightSidebarIndex from "./sideBar/right";
import NameModal from "./NameModal";

const Bazar = () => {
  const [displayMode, setDisplayMode] = useState("card");
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("دسته‌بندی");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userMobile, setUserMobile] = useState("");
  const [isUserDataSaved, setIsUserDataSaved] = useState(false);
  const [isLoadingUserStatus, setIsLoadingUserStatus] = useState(false);
  const [userStatusError, setUserStatusError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [page, setPage] = useState(1); // شماره صفحه
  const [numBid, setNumBid] = useState(0);
  const [hasMore, setHasMore] = useState(true); // آیا داده‌های بیشتری وجود دارد؟
  const [isFetching, setIsFetching] = useState(false); // وضعیت بارگذاری بیشتر
  const [isDataMiningFinished, setIsDataMiningFinished] = useState(false); // پیغام پایان داده‌کاوی
  
  // Fetching category options
  const fetchCategoryOptions = useCallback(async () => {
    try {
      const response = await axios.get(`${Config.baseUrl}/catalogue/all_types`);
      const data = response.data;
      const formattedOptions = [
        { value: "None", label: "همه" },
        ...data.map((item) => ({
          value: item.id,
          label: item.title,
        })),
      ];
      setCategoryOptions(formattedOptions);
    } catch (err) {
      console.error("Error fetching category options:", err);
      setError(err);
    }
  }, []);

  // Fetching items based on search params
  const fetchItems = useCallback(async (params) => {
    setIsLoading(true);
    setIsDataMiningFinished(false); // Reset data mining status before fetching new data

    try {
      const response = await axios.post(
        `${Config.baseUrl}/api/search`,
        params,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const results = response.data["results"];
      setItems(results);

      if (results.length === 0) {
        setIsDataMiningFinished(true); // Set data mining finished if no results
      } else {
        setIsDataMiningFinished(false);
        setPage(1); // Reset page to 1 on new search
        setHasMore(true); // Reset hasMore to true on new search
      }
    } catch (err) {
      console.error("در هنگام دریافت داده‌ها این خطا اتفاق افتاده :", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetching more items for infinite scroll
  const fetchMoreItems = useCallback(async () => {
    if (isFetching || !hasMore) return;

    setIsFetching(true);

    try {
      const params = {
        bazar: "None",
        type: "None",
        price: "None",
        page: page + 1, // Increase page number for next request
      };

      const response = await axios.post(
        `${Config.baseUrl}/api/search`,
        params,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const newItems = response.data.results;

      if (newItems.length < 8) {
        setHasMore(false); // اگر تعداد آیتم‌های دریافتی کمتر از ۸ بود، نشان دهیم که دیگر آیتمی وجود ندارد
      }
      if (newItems.length > 0) {
        setItems((prevItems) => [...prevItems, ...newItems]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setIsDataMiningFinished(true); // Set data mining finished if no results
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setHasMore(false); // وقتی به انتهای داده‌ها می‌رسیم و وضعیت 404 برمی‌گردد
      } else {
        console.error("در هنگام دریافت داده‌ها این خطا اتفاق افتاده :", err);
        setError(err);
      }
    } finally {
      setIsFetching(false);
    }
  }, [isFetching, hasMore, page]);

  // Fetching bid permission
  const fetchBidPermission = useCallback(async () => {
    const jwtToken = sessionStorage.getItem("accessToken");

    try {
      const response = await axios.get(`${Config.baseUrl}/bid/check_bid/`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.data.status === "success" && response.data.num_bid > 0) {
        setNumBid(response.data.num_bid);
      } else {
        setNumBid(0);
      }
    } catch (error) {
      console.error("Error fetching bid permission:", error);
      setNumBid(0);
    }
  }, []);

  // Handling scroll event
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - 100) {
      fetchMoreItems();
    }
  }, [fetchMoreItems]);

  useEffect(() => {
    fetchCategoryOptions();
    fetchItems({
      bazar: "None",
      type: "None",
      price: "None",
    });
    fetchBidPermission(); // Fetch bid permission on component mount

    const storedMobile = sessionStorage.getItem("mobile");
    if (storedMobile) {
      setUserMobile(storedMobile);
      checkUserStatus(storedMobile);
    }
  }, [fetchCategoryOptions, fetchItems, fetchBidPermission]);

  const handleNumBidUpdate = (numBid) => {
    setNumBid(numBid);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Checking user status
  const checkUserStatus = async (mobile) => {
    setIsLoadingUserStatus(true);
    try {
      const response = await axios.post(`${Config.baseUrl}/login/verifyName`, {
        mobile: mobile,
      });

      const data = response.data;

      if (data.status === "Nothing") {
        setIsUserDataSaved(false);
        setIsModalOpen(true);
      } else {
        setIsUserDataSaved(true);
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Error checking user status:", err);
      setUserStatusError(err);
      setIsModalOpen(true);
    } finally {
      setIsLoadingUserStatus(false);
    }
  };

  // Handling modal submit
  const handleModalSubmit = async (userInfo) => {
    setIsSubmitting(true);
    try {
      await axios.post(`${Config.baseUrl}/login/verifyName`, {
        mobile: userMobile,
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        password: userInfo.password,
      });
      setIsUserDataSaved(true);
      setIsModalOpen(false);
      sessionStorage.setItem("userDataSaved", "true");
    } catch (err) {
      console.error("Error submitting user data:", err);
      setSubmitError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handling search
  const handleSearch = (searchParams) => {
    fetchItems(searchParams);
    const category = categoryOptions.find(
      (option) => option.value === searchParams.type
    );
    setSelectedCategory(category ? category.label : "دسته‌بندی");
  };

  if (error) {
    return <div className="rtl_fa">خطای پیش آمده : {error.message}</div>;
  }

  return (
    <div className="container">
      {isModalOpen && (
        <NameModal isOpen={isModalOpen} onSubmit={handleModalSubmit} />
      )}
      {isLoadingUserStatus && <div>در حال بررسی وضعیت کاربر...</div>}
      {userStatusError && (
        <div className="rtl_fa">
          خطای وضعیت کاربر: {userStatusError.message}
        </div>
      )}
      {isSubmitting && <div>در حال ارسال اطلاعات...</div>}
      {submitError && (
        <div className="rtl_fa">خطای ارسال اطلاعات: {submitError.message}</div>
      )}
      {isDataMiningFinished && <div>پایان داده‌کاوی</div>}
      <div className="row">
        <div className="col-lg-9">
          <AdvertisingOne
            image={mazafati}
            title="بازرگانی زرگرزاده اولین صادرکننده خرما حامی اصلی سامانه ربو می باشد"
            link="https://zargarzadeh.com"
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
                  <CardVertical 
                    items={items}
                    numBid={numBid} // ارسال مقدار numBid به CardVertical
                    onNumBidUpdate={handleNumBidUpdate} // ارسال تابع به CardVertical
                  />
                ) : (
                  <CardHorizontal 
                    items={items} 
                    numBid={numBid} // ارسال مقدار numBid به CardHorizontal
                    onNumBidUpdate={handleNumBidUpdate} // ارسال تابع به CardHorizontal
                  />
                )}
                {isFetching && <div>در حال بارگذاری...</div>}
              </div>
            )}
          </div>
        </div>
        <div className="col-lg-3 ">
          <RightSidebarIndex numBidMain={numBid} />
        </div>
      </div>
    </div>
  );
};

export default Bazar;
