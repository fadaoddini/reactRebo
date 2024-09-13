import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import Select from 'react-select';
import config from '../../config/config';
import styles from './ModalWithForm.module.css';

const ModalWithForm = ({ isOpen, onClose }) => {
  const [formStep, setFormStep] = useState(1);
  const [category, setCategory] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [attributeOptions, setAttributeOptions] = useState({});
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // بارگذاری دسته‌بندی‌ها
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.baseUrl}/divar/categories/`);
        const filteredCategories = response.data.filter(cat => cat.parent); // فیلتر کردن زیرمجموعه‌ها
        const options = filteredCategories.map(cat => ({
          value: cat.id,
          label: cat.name,
        }));
        setCategories(options);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // بارگذاری خصوصیات برای دسته‌بندی انتخاب شده
  useEffect(() => {
    if (category) {
      const fetchAttributes = async () => {
        try {
          const response = await axios.get(`${config.baseUrl}/divar/categories/${category}/attributes/`);
          setAttributes(response.data);

          const options = response.data.reduce((acc, attr) => {
            acc[attr.id] = attr.values.map(value => ({
              value: value.id,
              label: value.value,
            }));
            return acc;
          }, {});
          setAttributeOptions(options);
        } catch (error) {
          console.error('Error fetching attributes:', error);
        }
      };

      fetchAttributes();
    }
  }, [category]);

  const handleDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      name: file.name,
      size: file.size,
      preview: URL.createObjectURL(file),
    }));

    setFiles(prevFiles => [
      ...prevFiles.filter(f => !newFiles.some(nf => nf.name === f.name)),
      ...newFiles,
    ]);
  };

  const handleRemoveFile = (name) => {
    setFiles(prevFiles => prevFiles.filter(file => file.name !== name));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    files.forEach(file => formData.append('images', file.file));

    attributes.forEach(attribute => {
      const selectedValue = attribute.value;
      if (selectedValue) {
        formData.append(`attributes[${attribute.id}]`, selectedValue);
      }
    });

    try {
      const accessToken = sessionStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token is missing');
      }
      const response = await axios.post(`${config.baseUrl}/divar/divars/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('Ad successfully created:', response.data);
      onClose();
    } catch (err) {
      console.error('Error submitting the ad:', err.response ? err.response.data : err.message);
      setError('خطا در افزودن آگهی. لطفاً دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setFiles([]);
    setCategory('');
    setDescription('');
    setAttributes([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {formStep === 1 && (
          <div className={styles.formGroup}>
            <h2>مرحله 1: دسته‌بندی را انتخاب کنید</h2>
            <label htmlFor="category">دسته‌بندی</label>
            <Select
              id="category"
              options={categories}
              onChange={(option) => setCategory(option ? option.value : '')}
            />
            <div className={styles.formActions}>
              <button className={styles.cancelButton} onClick={handleCancel}>
                لغو
              </button>
              <button onClick={() => setFormStep(2)}>ادامه</button>
            </div>
          </div>
        )}

        {formStep === 2 && (
          <div className={styles.formGroup}>
            <h2>مرحله 2: خصوصیات را انتخاب کنید</h2>
            <div className={styles.attributesGroup}>
              {attributes.map((attribute) => (
                <div key={attribute.id} className={styles.attributeItem}>
                  <label htmlFor={`attribute-${attribute.id}`}>{attribute.name}</label>
                  <Select
                    id={`attribute-${attribute.id}`}
                    options={attributeOptions[attribute.id] || []}
                    placeholder="انتخاب کنید..."
                    onChange={(option) =>
                      setAttributes(prevAttributes =>
                        prevAttributes.map(attr =>
                          attr.id === attribute.id
                            ? { ...attr, value: option ? option.value : null }
                            : attr
                        )
                      )
                    }
                  />
                </div>
              ))}
            </div>
            <div className={styles.formActions}>
              <button className={styles.cancelButton} onClick={handleCancel}>
                لغو
              </button>
              <button onClick={() => setFormStep(1)}>قبلی</button>
              <button onClick={() => setFormStep(3)}>ادامه</button>
            </div>
          </div>
        )}

        {formStep === 3 && (
          <div className={styles.formGroup}>
            <h2>مرحله 3: عنوان و توضیحات آگهی</h2>
            <label htmlFor="title">عنوان</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="description">توضیحات</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className={styles.formActions}>
              <button className={styles.cancelButton} onClick={handleCancel}>
                لغو
              </button>
              <button onClick={() => setFormStep(2)}>قبلی</button>
              <button onClick={() => setFormStep(4)}>ادامه</button>
            </div>
          </div>
        )}

        {formStep === 4 && (
          <div className={styles.formGroup}>
            <h2>مرحله 4: تصاویر را بارگذاری کنید</h2>
            <Dropzone onDrop={handleDrop} multiple>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: styles.dropzone })}>
                  <input {...getInputProps()} />
                  <p>تصاویر را اینجا بکشید و رها کنید یا کلیک کنید برای انتخاب</p>
                </div>
              )}
            </Dropzone>
            <div className={styles.filePreviewContainer}>
              {files.map((file, index) => (
                <div key={index} className={styles.filePreview}>
                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemoveFile(file.name)}
                  >
                    X
                  </button>
                  <img src={file.preview} alt={file.name} />
                  <div className={styles.fileDetails}>
                    <p>{file.name}</p>
                    <p>{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
              ))}
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.formActions}>
              <button className={styles.cancelButton} onClick={handleCancel}>
                لغو
              </button>
              <button onClick={() => setFormStep(3)}>قبلی</button>
              <button onClick={handleSubmit} disabled={loading}>
                {loading ? 'در حال ارسال...' : 'ارسال'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalWithForm;
