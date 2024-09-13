import React from 'react';
import ImageUpload from "../../components/utils/ImageUpload";
import styles from './modalStyles.module.css'; // استایل‌های مخصوص مودال

const AddModalShop = ({ isOpen, toggleModal, handleSubmit, handleChange, handleFileChange, formData }) => {
  
  const handleImageDrop = (file) => {
    // اتصال فایل به فرم اصلی
    handleFileChange({
      target: { name: 'image', files: [file] },
    });
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={toggleModal}>
          &times;
        </span>
        <h4 className={styles.modalTitle}>فرم ثبت فروشگاه</h4>

        <div className={styles.modalBody}>
          {/* بخش سمت چپ (آپلود تصویر) */}
          <div className={styles.uploadSection}>
            <ImageUpload onDrop={handleImageDrop} />
          </div>

          {/* بخش سمت راست (فرم) */}
          <div className={styles.formSection}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className="form-group">
                <label htmlFor="name_shop">نام فروشگاه</label>
                <input
                  type="text"
                  name="name_shop"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="administrator">مدیر فروشگاه</label>
                <input
                  type="text"
                  name="administrator"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobile">موبایل پشتیبان فروشگاه</label>
                <input
                  type="text"
                  name="mobile"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="code_posti">کد پستی فروشگاه</label>
                <input
                  type="text"
                  name="code_posti"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">آدرس فروشگاه</label>
                <textarea
                  name="address"
                  className="form-control"
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                ثبت نام
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModalShop;
