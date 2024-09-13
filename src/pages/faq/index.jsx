// Faq.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './faqStyles.module.css';
import Config from "../../config/config"; // ایمپورت فایل کانفیگ

const Faq = () => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openIndex, setOpenIndex] = useState(null); // برای مدیریت وضعیت آکاردئون

    // فراخوانی API برای دریافت سوالات متداول
    useEffect(() => {
        axios.get(`${Config.baseUrl}/law/all_faqs/`) // استفاده از baseUrl در فایل config
            .then(response => {
                setFaqs(response.data);
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
        <div className={styles.faqContainer}>
            <h1 className={styles.faqTitle}>سوالات متداول</h1>
            {faqs.map((faq, index) => (
                <div key={faq.id} className={styles.faqItem}>
                    <div
                        className={styles.faqHeader}
                        onClick={() => handleToggle(index)}
                    >
                        {faq.question}
                    </div>
                    <div
                        className={`${styles.faqAnswer} ${openIndex === index ? styles.open : ''}`}
                    >
                        {faq.answer}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Faq;
