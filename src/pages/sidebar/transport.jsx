import React, { useState, useEffect } from "react";
import axios from "axios";
import mazafati from "../../assets/images/mazafati.jpg";
import HeavyVehicleRegisterButton from "../../components/Button/HeavyVehicleRegisterButton";
import Config from "../../config/config";
import CreateTransportReqModal from "../transport/CreateTransportReqModal";
import styles from "./transport.module.css";
import TransportNotPay from "../../pages/transport/transportList/TransportNotPay";
import TransportNotActive from "../../pages/transport/transportList/TransportNotActive";
import TransportActive from "../../pages/transport/transportList/TransportActive";

const RightSidebar = ({
  transportTypes,
  onTransportAdded,
  transportReq,
  transportReqsNotActive,
  transportReqsActive,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [myTransport, setMyTransport] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [jwtToken, setJwtToken] = useState(sessionStorage.getItem("accessToken"));

  const handleOpenRequestModal = (transport) => {
    setSelectedTransport(transport);
    setIsDialogOpen(true);
  };

  const handleCloseRequestModal = () => {
    setIsDialogOpen(false);
    setSelectedTransport(null);
  };

  const refreshToken = async () => {
    const refreshToken = sessionStorage.getItem("refreshToken");
    if (!refreshToken) {
      console.error('No refresh token available');
      return;
    }

    try {
      const response = await axios.post(
        `${Config.baseUrl}/api/token/refresh/`,
        { refresh: refreshToken }
      );
      const { access } = response.data;
      sessionStorage.setItem('accessToken', access);
      setJwtToken(access);
      console.log('Access token refreshed:', access);
    } catch (error) {
      console.error('Error refreshing token:', error.response ? error.response.data : error.message);
    }
  };

  const handleMyTransport = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${Config.baseUrl}/transport/my_transport/`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (response.status === 200) {
        setMyTransport(response.data);
        console.log("Data received:", response.data);
      } else {
        console.error("Error fetching data: ", response.statusText);
        if (response.status === 401) {
          await refreshToken();
          handleMyTransport(); // Retry request after refreshing token
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleMyTransport();
  }, [jwtToken]); // Adding jwtToken as dependency to trigger re-fetch when token is refreshed

  const handlePaymentClick = async (transportId) => {
    try {
      const response = await axios.post(
        `${Config.baseUrl}/transport/payment/api/`,
        { transport_id: transportId },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (response.data.status === "success") {
        window.location.href = response.data.payment_link;
      } else {
        alert("خطا در ایجاد لینک پرداخت");
      }
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };

  return (
    <div>
      <div className="card-body rtl_fa">
        <HeavyVehicleRegisterButton
          transportTypes={transportTypes}
          onTransportAdded={onTransportAdded}
        />
        {myTransport.length > 0 ? (
          <ul className={styles.list}>
            {myTransport.map((transport) => {
              const firstTwoDigits = transport.pelak.slice(0, 2);
              const lastThreeDigits = transport.pelak.slice(-3);
              return (
                <li
                  key={transport.id}
                  className={styles.listItem}
                  onClick={() => handleOpenRequestModal(transport)}
                >
                  <img
                    src={
                      transport.image
                        ? `${Config.baseUrl}${transport.image}`
                        : mazafati
                    }
                    alt={transport.car_name}
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                  />
                  <h6>{transport.car_name}</h6>
                  <div className={styles.licensePlate}>
                    <div className={styles.licensePlateTop}>
                      <span className={styles.licensePlateNumber}>
                        {firstTwoDigits} ع {lastThreeDigits}
                      </span>
                      <span className={styles.right_pelak}>
                        <span className={styles.licensePlateIran}>ایران</span>
                        <span className={styles.licensePlateIranBottom}>
                          {transport.iran}
                        </span>
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>هیچ حمل و نقلی ثبت نشده است.</p>
        )}

        <TransportNotPay
          transportReq={transportReq}
          handlePaymentClick={handlePaymentClick}
        />

        <TransportNotActive transportReqsNotActive={transportReqsNotActive} />
        <TransportActive transportReqsActive={transportReqsActive} />
      </div>

      {isDialogOpen && (
        <CreateTransportReqModal
          onClose={handleCloseRequestModal}
          onRequestAdded={onTransportAdded}
          transport={selectedTransport}
        />
      )}
    </div>
  );
};

export default RightSidebar;
