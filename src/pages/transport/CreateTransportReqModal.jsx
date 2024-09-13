import React, { useState, useEffect } from "react";
import axios from "../../config/axiosInstance";
import Modal from "react-modal";
import Config from "../../config/config";
import styles from "../../pages/transport/AddReqTransportButton.module.css";
import Select2SearchCity from "../../components/select2search/Select2SearchCity";
import SuccessMessage from "../../components/utils/SuccessMessage"; // Import SuccessMessage
import NumberToWords from '../../components/utils/Num2Word/NumberToWords'; // Import NumberToWords


const CreateTransportReqModal = ({ onClose, onRequestAdded, transport }) => {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    price: "",
    description: "",
    barnameh: transport ? transport.barnameh : "ONE_ME",
    my_transport: transport ? transport.id : "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [estimatedPriceMax, setEstimatedPriceMax] = useState(null);
  const [estimatedDistance, setEstimatedDistance] = useState(null);
  const [locations, setLocations] = useState([]);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false); // State for SuccessMessage
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  // Handle radio button change
  const handleRadioChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      barnameh: e.target.value,
    }));
  };

  // Fetch locations on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          `${Config.baseUrl}/transport/all_locations`
        );
        setLocations(
          response.data.map((location) => ({
            value: location.id,
            label: location.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  // Update form data when transport changes
  useEffect(() => {
    if (transport) {
      setFormData((prevData) => ({
        ...prevData,
        my_transport: transport.id,
        barnameh: transport.barnameh || "ONE_ME",
      }));
    }
  }, [transport]);

  // Calculate route whenever origin or destination changes
  useEffect(() => {
    if (formData.origin && formData.destination) {
      calculateRoute(
        formData.origin,
        formData.destination,
        transport?.capacity
      );
    }
  }, [formData.origin, formData.destination, transport?.capacity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, option) => {
    const value = option ? option.value : "";
    setFormData({ ...formData, [name]: value });
  };

  // Calculate route
  const calculateRoute = async (origin_id, destination_id, capacity) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.post(
        `${Config.baseUrl}/transport/calculate_route/`,
        {
          origin_id,
          destination_id,
          capacity,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setEstimatedPrice(response.data.min_cost);
      setEstimatedPriceMax(response.data.max_cost);
      setEstimatedDistance(response.data.distance_km);
    } catch (error) {
      console.error("Error calculating route:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const accessToken = sessionStorage.getItem("accessToken");
      await axios.post(
        `${Config.baseUrl}/transport/create_transport_req`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSuccessMessage("درخواست با موفقیت ثبت شد.");
      setSuccessMessageOpen(true); // Open the success message
      if (onRequestAdded) onRequestAdded();
    } catch (error) {
      console.error("Error creating transport request:", error);
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessMessageClose = () => {
    setSuccessMessageOpen(false);
    onClose(); // Close the modal when success message is closed
  };

  return (
    <>
      <Modal
        isOpen={true}
        onRequestClose={onClose}
        contentLabel="Create Transport Request"
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
      >
        <h2>درخواست حمل و نقل {transport ? `برای ${transport.car_name}` : ""}</h2>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="origin">مبدأ</label>
              <Select2SearchCity
                id="origin"
                name="origin"
                value={locations.find((loc) => loc.value === formData.origin)}
                onChange={(option) => handleSelectChange("origin", option)}
                placeholder="انتخاب مبدأ"
                excludedValues={formData.destination ? [formData.destination] : []}
                locations={locations}
              />
              {errors.origin && <p className={styles.error}>{errors.origin}</p>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="destination">مقصد</label>
              <Select2SearchCity
                id="destination"
                name="destination"
                value={locations.find((loc) => loc.value === formData.destination)}
                onChange={(option) => handleSelectChange("destination", option)}
                placeholder="انتخاب مقصد"
                excludedValues={formData.origin ? [formData.origin] : []}
                locations={locations}
              />
              {errors.destination && (
                <p className={styles.error}>{errors.destination}</p>
              )}
            </div>
          </div>

          {estimatedDistance !== null &&
            estimatedPrice !== null &&
            estimatedPriceMax !== null && (
              <div className={styles.badgeContainer}>
                <div className={styles.badge}>
                  <span>
                    پیشنهاد هوشمند برای ظرفیت{" "}
                    <strong>{transport?.capacity || ""}</strong> تن از مبدأ
                    <strong>
                      {" "}
                      {locations.find((loc) => loc.value === formData.origin)
                        ?.label || "انتخاب نشده"}{" "}
                    </strong>
                    به مقصد
                    <strong>
                      {" "}
                      {locations.find((loc) => loc.value === formData.destination)
                        ?.label || "انتخاب نشده"}{" "}
                    </strong>
                    که حدود <strong>{estimatedDistance}</strong> کیلومتر می‌باشد.
                  </span>
                  <span>
                    محدوده قیمتی از
                    <strong>{estimatedPrice.toLocaleString()}</strong> ریال تا
                    <strong> {estimatedPriceMax.toLocaleString()}</strong> ریال
                    می‌باشد.
                  </span>
                </div>
              </div>
            )}

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="price">قیمت پیشنهادی</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
              {errors.price && <p className={styles.error}>{errors.price}</p>}
             
            </div>
           
            <div className={styles.formGroup}>
              <label>هزینه بارنامه با</label>
              <div className={styles.radioGroup}>
                <div className={styles.radioOption}>
                  <input
                    type="radio"
                    id="driver"
                    name="barnameh"
                    value="ONE_ME"
                    checked={formData.barnameh === "ONE_ME"}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="driver">
                    <div className={styles.radioCheckmark} />
                    راننده
                  </label>
                </div>
                <div className={styles.radioOption}>
                  <input
                    type="radio"
                    id="owner"
                    name="barnameh"
                    value="UP_TO_YOU"
                    checked={formData.barnameh === "UP_TO_YOU"}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="owner">
                    <div className={styles.radioCheckmark} />
                    صاحب بار
                  </label>
                </div>
              </div>
            </div>
           
          </div>
          <div className={styles.numnum}>
          <NumberToWords number={formData.price} />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="description">توضیحات</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className={styles.error}>{errors.description}</p>
            )}
          </div>

          <div className={styles.formButtons}>
            <button
              type="submit"
              className={`${styles.btn} ${styles.btnPrimary}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "در حال ارسال..." : "ثبت درخواست"}
            </button>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={onClose}
            >
              بستن
            </button>
          </div>
        </form>
      </Modal>

      {/* SuccessMessage component for success message */}
      <SuccessMessage
        message={successMessage}
        isOpen={successMessageOpen}
        onClose={handleSuccessMessageClose}
      />
    </>
  );
};

export default CreateTransportReqModal;
