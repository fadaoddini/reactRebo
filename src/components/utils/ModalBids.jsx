import React, { useState, useEffect } from "react";
import axios from 'axios';
import Config from "../../config/config";
import styles from "./ModalBids.module.css"; // Import your CSS module
import mobileIcon from "../../assets/images/call.png"; // حذف سایر آیکن‌ها که در این کد استفاده نمی‌شوند

const ModalBids = ({ isOpen, onClose, productId, title }) => {
    const [bids, setBids] = useState([]);
    console.error("title title title title1111:", title);
    useEffect(() => {
        if (productId) {
            fetchBids();
        }
    }, [productId]);

    const fetchBids = async () => {
        try {
            const response = await axios.get(`${Config.baseUrl}/bid/bid_by_type/api/${productId}/`);
            setBids(response.data);
        } catch (error) {
            console.error("Error fetching bids:", error);
        }
    };

    if (!isOpen) return null;

    // جدا کردن پیشنهادات خرید و فروش
    const buyBids = bids.filter(bid => bid.sellbuy === 2);
    const sellBids = bids.filter(bid => bid.sellbuy !== 2);

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button onClick={onClose} className={styles.closeButton}>
                    x
                </button>
                <div className={styles.header}>
                    <h3>بهترین پیشنهاد دهندگان - {title}</h3>
                </div>
                <div className={styles.columnsWrapper}>
                    <div className={styles.column}>
                        <h3>پیشنهادات فروش</h3>
                        <ul className={styles.bidList}>
                            {buyBids.map((bid) => (
                                <li key={bid.product} className={`${styles.bidItem} ${styles.buy}`}>
                                    توسط
                                    <div className={styles.stronger}>
                                        {bid.user}
                                    </div>
                                    هر کیلو
                                    <div className={styles.stronger}>
                                        {bid.price}
                                    </div>
                                    ریال
                                    <div className={styles.mob}>
                                        <a href={`tel:${bid.mobile}`}>
                                            <img src={mobileIcon} alt="Mobile Icon" />
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.column}>
                        <h3>پیشنهادات خرید</h3>
                        <ul className={styles.bidList}>
                            {sellBids.map((bid) => (
                                <li key={bid.product} className={`${styles.bidItem} ${styles.sell}`}>
                                    توسط
                                    <div className={styles.stronger}>
                                        {bid.user}
                                    </div>
                                    هر کیلو
                                    <div className={styles.stronger}>
                                        {bid.price}
                                    </div>
                                    ریال
                                    <div className={styles.mob}>
                                        <a href={`tel:${bid.mobile}`}>
                                            <img src={mobileIcon} alt="Mobile Icon" />
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalBids;
