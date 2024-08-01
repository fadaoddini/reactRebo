import React, { useState } from "react";
import Card from "../../components/chart/Card";
import ModalReport from "../../components/utils/ModalChart"; // برای نمایش گزارش
import ModalMarket from "../../components/utils/ModalBazar"; // برای نمایش بازار
import RightSidebarBazar from "../sidebar/rightBazar";
import flag from "../../assets/images/flag.png";
import mazafati from "../../assets/images/mazafati.jpg";
import AdvertisingOne from "../../components/imageCard/advertisingOne";

const Bazar = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isMarketModalOpen, setIsMarketModalOpen] = useState(false);

  const handleReportClick = () => {
    setIsReportModalOpen(true);
  };

  const handleMarketClick = () => {
    setIsMarketModalOpen(true);
  };

  const handleCloseReportModal = () => {
    setIsReportModalOpen(false);
  };

  const handleCloseMarketModal = () => {
    setIsMarketModalOpen(false);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          <AdvertisingOne
            image={mazafati}
            title="محل تبلیغات کد چهار (ماهیانه 11,000,000 تومان)"
            link="https://example.com"
            icon={flag}
          />
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6">
              <Card
                title="خرمای مضافتی 6 تا 7 کیلوگرم"
                onReportClick={handleReportClick}
                onMarketClick={handleMarketClick}
              />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6">
              <Card
                title="خرمای مضافتی 7 تا 8 کیلوگرم"
                onReportClick={handleReportClick}
                onMarketClick={handleMarketClick}
              />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6">
              <Card
                title="خرمای مضافتی زیر 6 کیلوگرم"
                onReportClick={handleReportClick}
                onMarketClick={handleMarketClick}
              />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6">
              <Card
                title="خرمای مضافتی بالای 8 کیلوگرم"
                onReportClick={handleReportClick}
                onMarketClick={handleMarketClick}
              />
            </div>
            <ModalReport isOpen={isReportModalOpen} onClose={handleCloseReportModal} />
            <ModalMarket isOpen={isMarketModalOpen} onClose={handleCloseMarketModal} />
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card custom-card margin-top-5">
            <RightSidebarBazar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bazar;
