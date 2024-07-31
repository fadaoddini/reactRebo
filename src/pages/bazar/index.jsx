import React, { useState } from "react";
import Card from "../../components/chart/Card";
import Modal from "../../components/utils/ModalChart";
import RightSidebarBazar from "../sidebar/right";

const Bazar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReportClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6">
              <Card
                title="خرمای مضافتی 6 تا 7 کیلوگرم"
                onReportClick={handleReportClick}
                onMarketClick="/catalogue/bazar/web/2/"
              />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6">
              <Card
                title="خرمای مضافتی 7 تا 8 کیلوگرم"
                onReportClick={handleReportClick}
                onMarketClick="/catalogue/bazar/web/3/"
              />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6">
              <Card
                title="خرمای مضافتی زیر 6 کیلوگرم"
                onReportClick={handleReportClick}
                onMarketClick="/catalogue/bazar/web/1/"
              />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6">
              <Card
                title="خرمای مضافتی بالای 8 کیلوگرم"
                onReportClick={handleReportClick}
                onMarketClick="/catalogue/bazar/web/4/"
              />
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card custom-card margin-top-5 ">
            <RightSidebarBazar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bazar;
