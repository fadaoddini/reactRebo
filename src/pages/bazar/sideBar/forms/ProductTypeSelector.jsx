import React from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import styles from "./FormStyle.module.css";

const ProductTypeSelector = ({ formData, productTypes, handleProductTypeChange }) => (
  <Form.Group controlId="productType" className={styles.form_group}>
    <Form.Label>نوع محصول</Form.Label>
    <Select
      value={formData.productType}
      onChange={handleProductTypeChange}
      options={productTypes}
      isClearable
      className={styles.form_control}
      placeholder="انتخاب کنید..." // اضافه کردن ویژگی placeholder
    />
  </Form.Group>
);

export default ProductTypeSelector;
