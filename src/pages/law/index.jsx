// Law.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import Config from "../../config/config";

const Law = () => {
    const [laws, setLaws] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openIndex, setOpenIndex] = useState(null); // برای مدیریت وضعیت آکاردئون

    // فراخوانی API برای دریافت قوانین
    useEffect(() => {
        axios.get(`${Config.baseUrl}/law/all_laws/`)
            .then(response => {
                setLaws(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('خطا در دریافت اطلاعات');
                setLoading(false);
            });
    }, []);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index); // باز یا بسته کردن آکاردئون
    };

    if (loading) return <p>در حال بارگذاری...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={styles.lawContainer}>
            <h1 className={styles.lawTitle}>قوانین</h1>
            {laws.map((law, index) => (
                <div key={law.id} className={styles.lawItem}>
                    <div
                        className={styles.lawHeader}
                        onClick={() => handleToggle(index)}
                    >
                        {law.title}
                    </div>
                    <div
                        className={`${styles.lawContent} ${openIndex === index ? styles.open : ''}`}
                    >
                        <div dangerouslySetInnerHTML={{ __html: law.text }}></div>
                        <p className={styles.lawRole}>بخش: {getRoleLabel(law.role)}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

// تابع کمکی برای نمایش نام نقش به فارسی
const getRoleLabel = (role) => {
    switch (role) {
        case 1: return 'بازار';
        case 2: return 'حمل و نقل';
        case 3: return 'فروشگاه';
        case 4: return 'آموزش';
        case 5: return 'ثبت نام';
        default: return 'نامشخص';
    }
}

export default Law;
