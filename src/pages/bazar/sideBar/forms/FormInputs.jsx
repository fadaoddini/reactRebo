import React from "react";
import { Form } from "react-bootstrap";
import styles from "./FormStyle.module.css";

const FormInputs = ({ formData, handleChange }) => (
  <div className={styles.form_grid}>
    <Form.Group controlId="productPrice" className={styles.form_group}>
      <Form.Label>قیمت محصول</Form.Label>
      <Form.Control
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
        className={styles.form_control}
      />
    </Form.Group>
    <Form.Group controlId="productWeight" className={styles.form_group}>
      <Form.Label>وزن محصول (کیلوگرم)</Form.Label>
      <Form.Control
        type="number"
        name="weight"
        value={formData.weight}
        onChange={handleChange}
        required
        className={styles.form_control}
      />
    </Form.Group>
    <Form.Group controlId="productWarranty" className={styles.form_group}>
      <Form.Label>آیا محصول شما ضمانت دارد؟</Form.Label>
      <Form.Control
        as="select"
        name="warranty"
        value={formData.warranty}
        onChange={handleChange}
        className={styles.form_control}
      >
        <option value="False">ضمانت ندارد</option>
        <option value="True">ضمانت دارد</option>
      </Form.Control>
    </Form.Group>
    <Form.Group controlId="expireTime" className={styles.form_group}>
      <Form.Label>اعتبار آگهی</Form.Label>
      <Form.Control
        as="select"
        name="expire_time"
        value={formData.expire_time}
        onChange={handleChange}
        className={styles.form_control}
      >
        <option value="1">1 روز</option>
        <option value="3">3 روز</option>
        <option value="7">7 روز</option>
        <option value="15">15 روز</option>
        <option value="30">30 روز</option>
      </Form.Control>
    </Form.Group>
    <Form.Group
      controlId="productDescription"
      className={`${styles.form_group} ${styles.full_width}`}
    >
      <Form.Label>توضیحات محصول</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        name="description"
        value={formData.description}
        onChange={handleChange}
        className={styles.form_control}
      />
    </Form.Group>
  </div>
);

export default FormInputs;
