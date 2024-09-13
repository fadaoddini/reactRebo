import React, { useState } from "react";
import axios from "../../config/axiosInstance";
import Config from "../../config/config";
import ImageUpload from "../../components/utils/ImageUpload";
import Select from "react-select";
import styles from "./CreateTransportModal.module.css";

const CreateTransportModal = ({ onClose, transportTypes, onTransportAdded }) => {
  const [carName, setCarName] = useState("");
  const [transportType, setTransportType] = useState(null);
  const [pelak, setPelak] = useState({ left: "", right: "", iran: "" });
  const [capacity, setCapacity] = useState(2);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jwtToken = sessionStorage.getItem("accessToken");

  const handleDrop = (file) => {
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("car_name", carName);
      formData.append(
        "transport_type",
        transportType ? transportType.value : ""
      );
      formData.append("pelak", `${pelak.left}${pelak.right}`);
      formData.append("iran", pelak.iran);
      formData.append("capacity", capacity);
      formData.append("description", description);
      if (image) formData.append("image", image);

      await axios.post(
        `${Config.baseUrl}/transport/create_transport`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      
      onTransportAdded(); // Call to refresh the transport list
      onClose();
    } catch (error) {
      console.error("Error creating transport:", error);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatOptionLabel = ({ label, image }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={image}
        alt={label}
        style={{
          width: 50,
          height: 50,
          marginRight: 5,
          marginLeft: 10,
          borderRadius: 50,
        }}
      />
      <span>{label}</span>
    </div>
  );

  const handlePelakChange = (field, maxLength) => (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= maxLength) {
      setPelak({ ...pelak, [field]: value });
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>ثبت نام خودروی سنگین</h2>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.formRow}>
            <div style={{ flex: "0 0 60%" }}>
              <div className={styles.formGroup}>
                <label>نام خودرو</label>
                <input
                  type="text"
                  value={carName}
                  onChange={(e) => setCarName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>نوع خودرو</label>
                <Select
                  value={transportType}
                  onChange={setTransportType}
                  options={transportTypes.map((type) => ({
                    value: type.id,
                    label: type.title,
                    image: `${Config.baseUrl}${type.image}`,
                  }))}
                  formatOptionLabel={formatOptionLabel}
                  placeholder="نوع خودرو را انتخاب کنید"
                  isSearchable
                />
              </div>
              <div className={styles.formGroup}>
                <label>پلاک</label>
                <div className={styles.licensePlateCard}>
                  <input
                    type="text"
                    value={pelak.left}
                    onChange={handlePelakChange("left", 2)}
                    maxLength="2"
                    placeholder="XX"
                    className={`${styles.licensePlateSegment} ${styles.left}`}
                  />
                  <span
                    className={`${styles.licensePlateSegment} ${styles.middle}`}
                  >
                    ع
                  </span>
                  <input
                    type="text"
                    value={pelak.right}
                    onChange={handlePelakChange("right", 3)}
                    maxLength="3"
                    placeholder="XXX"
                    className={`${styles.licensePlateSegment} ${styles.right}`}
                  />
                  <span
                    className={`${styles.licensePlateSegment} ${styles.middle}`}
                  >
                    ایران
                  </span>
                  <input
                    type="text"
                    value={pelak.iran}
                    onChange={handlePelakChange("iran", 2)}
                    maxLength="2"
                    placeholder="YY"
                    className={`${styles.licensePlateSegment} ${styles.iran}`}
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>ظرفیت (تن)</label>
                <div className={styles.capacitySlider}>
                  <input
                    type="range"
                    min="2"
                    max="25"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                  />
                  <span>{capacity} تن</span>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>توضیحات</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div style={{ flex: "0 0 40%" }}>
              <div className={styles.formGroup}>
                <label>تصویر</label>
                <ImageUpload onDrop={handleDrop} />
              </div>
            </div>
          </div>

          <div className={styles.formRow}>
            <button
              type="submit"
              className={`${styles.btn} ${styles.btnPrimary}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "در حال ارسال..." : "ثبت"}
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
      </div>
    </div>
  );
};

export default CreateTransportModal;
