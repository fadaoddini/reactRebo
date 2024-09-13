import React from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import styles from "./AttributesSelector.module.css"; // به‌روز شده برای استفاده از استایل‌های جدید

const AttributesSelector = ({
  attributes,
  attributeOptions,
  formData,
  handleAttributeValueChange,
  handleAttributeSelect
}) => (
  <div className={styles.attributes_container}> {/* استفاده از کلاس جدید */}
    {attributes.map((attr) => (
      <Form.Group
        key={attr.value}
        controlId={`attribute_${attr.value}`}
        className={styles.form_group}
      >
        <Form.Label>{attr.label}</Form.Label>
        <Select
          value={formData.attributeValues[attr.value] || null}
          onChange={(selectedOption) =>
            handleAttributeValueChange(attr.value, selectedOption)
          }
          options={attributeOptions[attr.value] || []}
          isClearable
          onFocus={() => handleAttributeSelect(attr)}
          className={styles.form_control}
          placeholder="انتخاب کنید..." // اضافه کردن ویژگی placeholder
        />
      </Form.Group>
    ))}
  </div>
);

export default AttributesSelector;
