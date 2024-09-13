import React from "react";
import Loading from "../../components/loading";
import CardTransport from "../../components/cardTransport/cardTransport";
import RightSidebar from "../sidebar/transport";
import AdvertisingOne from "../../components/imageCard/advertisingOne";
import TypeTransport from "./TypeTransport";
import CreateTransportModal from "./CreateTransportModal";
import flag from "../../assets/images/flag.png";
import mazafati from "../../assets/images/mazafati.jpg";
import useTransport from "./useTransport";
import styles from "./styles.module.css";
import AlertMessage from "../../components/utils/AlertMessage"; // Import AlertMessage

const Transport = () => {
  const {
    isTypesLoading,
    isTransportsLoading,
    types,
    selectedType,
    transports,
    typesError,
    transportsError,
    isModalOpen,
    transportReqs,
    transportReqsNotActive,
    transportReqsActive,
    handleSelectType,
    openModal,
    closeModal,
    handleTransportAdded,
  } = useTransport();

  // بررسی JWT از sessionStorage
  const jwtToken = sessionStorage.getItem("accessToken");
  const isUserLoggedIn = !!jwtToken; // تبدیل به true/false

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          <AdvertisingOne
            image={mazafati}
            title="بازرگانی زرگرزاده اولین صادرکننده خرما حامی اصلی سامانه ربو می باشد"
            link="https://zargarzadeh.com"
            icon={flag}
          />
          <div className="card custom-card margin-top-5">
            {isTypesLoading || isTransportsLoading ? (
              <Loading />
            ) : typesError || transportsError ? (
              <p>{typesError || transportsError}</p>
            ) : (
              <div className="card-body">
                <TypeTransport
                  types={types}
                  selectedType={selectedType}
                  onSelect={handleSelectType}
                />
                <CardTransport
                  selectedType={selectedType}
                  transports={transports}
                />
              </div>
            )}
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card custom-card margin-top-5">
            {/* شرط لاگین بودن کاربر */}
            {isUserLoggedIn ? (
              <RightSidebar
                transportTypes={types}
                onTransportAdded={handleTransportAdded}
                transportReq={transportReqs}
                transportReqsNotActive={transportReqsNotActive}
                transportReqsActive={transportReqsActive}
              />
            ) : (
              <p className={styles.not_login}>
                لطفا برای استفاده از امکانات این سامانه ابتدا وارد شوید
              </p>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <CreateTransportModal
          onClose={closeModal}
          transportTypes={types}
          onTransportAdded={handleTransportAdded}
        />
      )}
    </div>
  );
};

export default Transport;
