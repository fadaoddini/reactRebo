import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./transport_card.module.css";
import noPic from "../../assets/images/nopic.png";
import noT from "../../assets/images/not.gif";
import Config from "../../config/config";
import Loading from "../loading";
import TransportModal from "./TransportModal";
import CountdownTimer from "../timer/CountdownTimer";

const CardTransport = ({ selectedType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transports, setTransports] = useState([]);
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchTransports = useCallback(
    async (pageNumber) => {
      setIsLoading(true);
      try {
        let res;
        if (selectedType === null) {
          res = await axios.get(
            `${Config.baseUrl}/transport/all_req_transport?page=${pageNumber}`,
            {
              headers: { "Content-Type": "application/json" },
            }
          );
        } else {
          res = await axios.post(
            `${Config.baseUrl}/transport/all_req_transport_by_type`,
            { id: selectedType.id, page: pageNumber },
            { headers: { "Content-Type": "application/json" } }
          );
        }

        console.log("Response data:", res.data);

        if (res.data.results && Array.isArray(res.data.results)) {
          if (res.data.results.length < 16) {
            setHasMore(false);
          }
          setTransports((prev) =>
            pageNumber === 1 ? res.data.results : [...prev, ...res.data.results]
          );
        } else {
          console.error("Unexpected data format:", res.data);
        }
      } catch (err) {
        console.error("Error fetching transports:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [selectedType]
  );

  useEffect(() => {
    setPage(1); // Reset page to 1 when selectedType changes
    setHasMore(true); // Reset hasMore to true
    fetchTransports(1); // Fetch data for the first page
  }, [selectedType, fetchTransports]);

  useEffect(() => {
    fetchTransports(page);
  }, [page, fetchTransports]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (
        scrollTop + windowHeight + 1 >= documentHeight &&
        hasMore &&
        !isLoading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isLoading]);

  const handleTransportClick = (transport) => {
    setSelectedTransport(transport);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransport(null);
  };

  return (
    <div className={styles.main_content}>
      <ToastContainer className={styles.rtl_direction} />

      {isLoading && transports.length === 0 ? (
        <Loading />
      ) : error ? (
        <p>Error loading transports.</p>
      ) : transports.length > 0 ? (
        <div className={styles.wrapper}>
          {transports.map((transport) => {
            const pelak = transport.pelak.toString();
            const firstTwoDigits = pelak.slice(0, 2);
            const lastThreeDigits = pelak.slice(-3);

            return (
              <div
                key={transport.id}
                onClick={() => handleTransportClick(transport)}
              >
                <div className={styles.transport_card}>
                  {transport.status && (
                    <div className={styles.availability_indicator} />
                  )}
                  {transport.status && (
                    <div className={styles.number_badge}>
                      <div className={styles.text_number_badge}>{transport.my_transport.capacity} تن</div>
                    </div>
                  )}
                  <img
                    src={
                      transport.image
                        ? `${Config.baseUrl}${transport.image}`
                        : noPic
                    }
                    alt={transport.my_transport.car_name}
                  />
                  <h1>
                    <strong>{transport.my_transport.car_name}</strong>
                  </h1>
                  <div className={styles.origin}>
                  <strong>مبدا :</strong>
                    <span>
                      {transport.origin} 
                    </span>
                  </div>
                  <div className={styles.destination}>
                  <strong>مقصد :</strong>
                    <span>
                    {transport.destination}
                    </span>
                  </div>
                  <div className={styles.distance}>
                    <strong>مسافت :</strong>
                    <span>{transport.distance}</span> کیلومتر
                  </div>
                  <div className={styles.price}>
                    <strong>قیمت :</strong>
                    <span>{transport.price.toLocaleString()}</span> ریال
                  </div>
                  <div className={styles.price}>
                    <strong>نوع :</strong>
   
                    <span>{transport.my_transport.transport_type}</span> 
                  </div>
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
                  <div className={styles.placeTimer}>
                    <div className={styles.timer}>
                      {/* اضافه کردن CountdownTimer به کارت */}
                      <CountdownTimer
                        targetDate={new Date(transport.expire_time)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {isLoading && <Loading />}
        </div>
      ) : (
        <div className={styles.noRequestContainer}>
          <img
            src={noT} // مسیر فایل GIF
            alt="چیزی پیدا نمی کنم"
            className={styles.noRequestImage}
          />
          <p className={styles.noRequestText}>
            در اینجا هنوز درخواستی ثبت نشده است
          </p>
        </div>
      )}
      {isModalOpen && selectedTransport && (
        <TransportModal
          transport={selectedTransport}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default CardTransport;
