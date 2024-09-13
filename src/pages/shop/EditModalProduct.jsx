import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ImageUpload from "../../components/utils/ImageUpload";
import Config from "../../config/config";
import styles from "./EditProductInShopModal.module.css";
import axios from 'axios';

// توابع API
import { fetchCategories, fetchChildCategories, fetchPackages } from "./shopUtils";

const EditModalProduct = ({ isOpen, toggleModal, productData, productImages }) => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        subCategory: '',
        package: '',
        weight: '',
        price: '',
        discount: '',
        number_exist: '',
        number_send: '',
        description: '',
    });
    const [images, setImages] = useState(productImages || []);
    const [categories, setCategories] = useState([]);
    const [childCategories, setChildCategories] = useState([]);
    const [packages, setPackages] = useState([]);
    const [deletedImages, setDeletedImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch data when component mounts or productData changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoryResponse, packageResponse] = await Promise.all([
                    fetchCategories(),
                    fetchPackages()
                ]);
                setCategories(categoryResponse);
                setPackages(packageResponse);

                if (productData?.category) {
                    const childCategoryResponse = await fetchChildCategories(productData.category.id);
                    setChildCategories(childCategoryResponse);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('خطا در بارگذاری داده‌ها');
            }
        };

        fetchData();
    }, [productData]);

    useEffect(() => {
        if (productData) {
            setFormData({
                ...productData,
                category: productData.category.id,
                subCategory: productData.sub_category ? productData.sub_category.id : '',
                package: productData.package.id,
            });
            if (productData.category) {
                fetchChildCategories(productData.category.id)
                    .then(childCategories => setChildCategories(childCategories))
                    .catch(error => console.error('Error fetching child categories:', error));
            }
        }
    }, [productData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));

        if (name === 'category' && value) {
            fetchChildCategories(value)
                .then(childCategories => setChildCategories(childCategories))
                .catch(error => console.error('Error fetching child categories:', error));
        }
    };

    const handleImageDrop = (file) => {
        setImages(prevImages => {
            if (!prevImages.some(img => img.name === file.name)) {
                return [...prevImages, file];
            }
            return prevImages;
        });
    };

    const handleRemoveImage = (index) => {
        const removedImage = images[index];
        setImages(prevImages => prevImages.filter((_, imgIndex) => imgIndex !== index));
        setDeletedImages(prevDeleted => [...prevDeleted, removedImage]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productId = formData.id;

        const updatedFormData = new FormData();
        Object.keys(formData).forEach(key => {
            updatedFormData.append(key, formData[key]);
        });

        // Add images that were not deleted
        images.forEach((file) => {
            updatedFormData.append('images', file);
        });

        // Add deleted image IDs (if needed by the server)
        deletedImages.forEach((file) => {
            updatedFormData.append('deletedImages', file.id);
        });

        setLoading(true);
        setError('');
        try {
            await axios.put(
                `${Config.baseUrl}/shop/edit_product_shop/${productId}/`,
                updatedFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                    }
                }
            );
            toggleModal();
        } catch (error) {
            console.error("Error updating product:", error);
            setError('خطا در به‌روزرسانی محصول');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <span className={styles.closeButton} onClick={toggleModal}>&times;</span>
                <div className={styles.titleContainer}>
                    <h2 className={styles.modalTitle}>ویرایش محصول</h2>
                </div>
                <div className={styles.modalBody}>
                    <div className={styles.imageSection}>
                        <h5>تصاویر فعلی</h5>
                        <div className={styles.imageList}>
                            {images.length > 0 ? (
                                images.map((img, index) => (
                                    <div key={index} className={styles.imageCard}>
                                        <img
                                            src={img instanceof File ? URL.createObjectURL(img) : `${Config.baseUrl}${img.image}`}
                                            alt={`Product Image ${index + 1}`}
                                            className={styles.imageThumbnail}
                                        />
                                        <button
                                            type="button"
                                            className={styles.removeButton}
                                            onClick={() => handleRemoveImage(index)}
                                        >
                                            حذف
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>تصویری برای نمایش موجود نیست</p>
                            )}
                        </div>
                        <h5>افزودن تصویر جدید</h5>
                        <ImageUpload onDrop={handleImageDrop} />
                    </div>
                    <div className={styles.formSection}>
                        <Form onSubmit={handleSubmit} className={styles.form}>
                            {error && <p className={styles.error}>{error}</p>}
                            <Form.Group controlId="formTitle" className={styles.fullRow}>
                                <Form.Label>عنوان محصول</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={formData.title || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <div className={styles.row}>
                                <Form.Group controlId="formCategory" className={styles.halfWidth}>
                                    <Form.Label>دسته‌بندی</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="category"
                                        value={formData.category || ''}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>انتخاب کنید</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formSubCategory" className={styles.halfWidth}>
                                    <Form.Label>زیر دسته‌بندی</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="subCategory"
                                        value={formData.subCategory || ''}
                                        onChange={handleChange}
                                        disabled={!formData.category}
                                    >
                                        <option value="" disabled>انتخاب کنید</option>
                                        {childCategories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formPackage" className={styles.halfWidth}>
                                    <Form.Label>نوع بسته بندی</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="package"
                                        value={formData.package || ''}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>انتخاب کنید</option>
                                        {packages.map(pkg => (
                                            <option key={pkg.id} value={pkg.id}>{pkg.title}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formWeight" className={styles.halfWidth}>
                                    <Form.Label>وزن هر بسته (kg)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="weight"
                                        value={formData.weight || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </div>

                            <div className={styles.row}>
                                <Form.Group controlId="formPrice" className={styles.quarterWidth}>
                                    <Form.Label>قیمت هر بسته</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        value={formData.price || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formDiscount" className={styles.quarterWidth}>
                                    <Form.Label>تخفیف (%)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="discount"
                                        value={formData.discount || ''}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formNumberExist" className={styles.quarterWidth}>
                                    <Form.Label>موجودی انبار </Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="number_exist"
                                        value={formData.number_exist || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formNumberSend" className={styles.quarterWidth}>
                                    <Form.Label>  محدودیت ارسال</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="number_send"
                                        value={formData.number_send || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </div>

                            <Form.Group controlId="formDescription" className={styles.fullRow}>
                                <Form.Label>توضیحات</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    value={formData.description || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <div className={styles.fullRow}>
                                <Button variant="primary" type="submit" disabled={loading}>
                                    {loading ? 'در حال بارگذاری...' : 'ویرایش محصول'}
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditModalProduct;
