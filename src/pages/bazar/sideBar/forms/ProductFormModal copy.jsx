import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "../../../../config/axiosInstance"; // تنظیمات Axios
import Select from "react-select"; // برای انتخاب از لیست
import { useDropzone } from "react-dropzone"; // برای آپلود تصاویر
import styles from "./FormStyle.module.css"; // استایل‌های CSS

const ProductFormModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    price: "",
    weight: "",
    warranty: "False",
    expire_time: "1",
    description: "",
    productType: null,
    attributeValues: {},
    images: [],
  });

  const [productTypes, setProductTypes] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [attributeOptions, setAttributeOptions] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const response = await axios.get("/catalogue/product_types/");
        const typeOptions = response.data.map((type) => ({
          value: type.id,
          label: type.title,
        }));
        setProductTypes(typeOptions);
      } catch (err) {
        console.error("Error fetching product types:", err);
        setError("خطا در بارگذاری انواع محصولات. لطفاً دوباره تلاش کنید.");
      }
    };

    fetchProductTypes();
  }, []);

  useEffect(() => {
    const fetchAttributes = async () => {
      if (formData.productType) {
        try {
          const response = await axios.get("/catalogue/product_attributes/", {
            params: { product_type_id: formData.productType.value },
          });
          const attributeOptions = response.data.map((attr) => ({
            value: attr.id,
            label: attr.title,
          }));
          setAttributes(attributeOptions);
          setFormData((prevState) => ({
            ...prevState,
            attributeValues: {},
          }));
          setAttributeOptions({});
        } catch (err) {
          console.error("Error fetching attributes:", err);
          setError("خطا در بارگذاری ویژگی‌ها. لطفاً دوباره تلاش کنید.");
        }
      } else {
        setAttributes([]);
        setFormData((prevState) => ({
          ...prevState,
          attributeValues: {},
        }));
        setAttributeOptions({});
      }
    };

    fetchAttributes();
  }, [formData.productType]);

  const fetchAttributeValues = async (attributeId) => {
    try {
      const response = await axios.get("/catalogue/attribute_values/", {
        params: { attribute_id: attributeId },
      });
      const values = response.data.map((value) => ({
        value: value.id,
        label: value.value,
      }));
      setAttributeOptions((prevOptions) => ({
        ...prevOptions,
        [attributeId]: values,
      }));
    } catch (err) {
      console.error("Error fetching attribute values:", err);
      setError("خطا در بارگذاری مقادیر ویژگی‌ها. لطفاً دوباره تلاش کنید.");
    }
  };

  const handleProductTypeChange = (selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      productType: selectedOption,
    }));
  };

  const handleAttributeValueChange = (attributeId, selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      attributeValues: {
        ...prevState.attributeValues,
        [attributeId]: selectedOption || null,
      },
    }));
  };

  const handleAttributeSelect = (attribute) => {
    if (!formData.attributeValues[attribute.value]) {
      fetchAttributeValues(attribute.value);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const newImages = acceptedFiles.filter(
        (file) => !formData.images.some((img) => img.name === file.name)
      );

      if (newImages.length > 0) {
        const newImagePreviews = newImages.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
        setFormData((prevState) => ({
          ...prevState,
          images: [...prevState.images, ...newImages],
        }));
        setImagePreviews((prevPreviews) => [
          ...prevPreviews,
          ...newImagePreviews,
        ]);
      }
    },
  });

  const handleRemoveImage = (index) => {
    URL.revokeObjectURL(imagePreviews[index].preview);

    const newImages = formData.images.filter((_, i) => i !== index);
    const newImagePreviews = imagePreviews.filter((_, i) => i !== index);

    setFormData((prevState) => ({
      ...prevState,
      images: newImages,
    }));
    setImagePreviews(newImagePreviews);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getToken = () => {
    return sessionStorage.getItem("accessToken");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData();
    form.append("price", formData.price);
    form.append("weight", formData.weight);
    form.append("warranty", formData.warranty);
    form.append("expire_time", formData.expire_time);
    form.append("description", formData.description);
    form.append(
      "product_type",
      formData.productType ? formData.productType.value : ""
    );

    const attrs = Object.keys(formData.attributeValues).map((attributeId) => ({
      attr: attributeId,
      value: formData.attributeValues[attributeId].value,
    }));
    form.append("attrs", JSON.stringify(attrs));

    formData.images.forEach((image, index) => {
      form.append(`image${index}`, image);
    });

    form.append("numpic", formData.images.length);

    try {
      const response = await axios.post("/catalogue/add_product_api/", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      console.log("محصول با موفقیت اضافه شد:", response.data);
      handleClose();
    } catch (err) {
      console.error(
        "خطا در افزودن محصول:",
        err.response ? err.response.data : err.message
      );
      setError("خطا در افزودن محصول. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} className={styles.product_form}>
      <Modal.Header closeButton className={styles.modal_header}>
        <Modal.Title className={styles.modal_title}>ثبت محصول</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className={styles.form_grid}>
            <Form.Group controlId="productType" className={styles.form_group}>
              <Form.Label>نوع محصول</Form.Label>
              <Select
                value={formData.productType}
                onChange={handleProductTypeChange}
                options={productTypes}
                isClearable
                className={styles.form_control}
              />
            </Form.Group>
            {formData.productType && (
              <>
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
                    />
                  </Form.Group>
                ))}
              </>
            )}
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
          </div>
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
          <Form.Group className={styles.form_group}>
            <Form.Label>تصاویر محصول</Form.Label>
            <div {...getRootProps({ className: styles.dropzone })}>
              <input {...getInputProps()} />
              <p>بکشید و رها کنید یا کلیک کنید برای انتخاب تصاویر</p>
              <div className={styles.image_preview_container}>
                {imagePreviews.map((file, index) => (
                  <div key={index} className={styles.image_wrapper}>
                    <img
                      src={file.preview}
                      alt={`Preview ${index}`}
                      className={styles.image_preview}
                      onLoad={() => URL.revokeObjectURL(file.preview)}
                    />
                    <button
                      type="button"
                      className={styles.remove_button}
                      onClick={() => handleRemoveImage(index)}
                    >
                      حذف
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Form.Group>
          {error && <p className={styles.text_danger}>{error}</p>}
          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            className={styles.btn_primary}
          >
            {loading ? "در حال ارسال..." : "ثبت محصول"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductFormModal;
