import React from 'react';
import styles from './ModalBazar.module.css'; // فرض کنید استایل‌ها در این فایل موجود است

const ModalMarket = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <div className={styles.connectWalletWrapper}>
          <div className={styles.innerBody}>
            <div className={styles.row}>
              <div className={styles.col-6}>
                <span className={styles.btnSuccess}>صف خریداران</span>
                <div className={styles.activityWrapperActionSingleSuccess}>
                  <div className={styles.activity3dotsMenu}>164,000,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/3/">
                        <span className={styles.textDanger}>20,000</span> کیلوگرم (هر کیلوگرم 82,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.col-6}>
                <span className={styles.btnDanger}>صف فروشندگان</span>
                <div className={styles.activityWrapperActionSingleDanger}>
                  <div className={styles.activity3dotsMenu}>15,000,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/2/">
                        <span className={styles.textDanger}>3,000</span> کیلوگرم (هر کیلوگرم 50,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.activityWrapperActionSingleDanger}>
                  <div className={styles.activity3dotsMenu}>15,000,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/2/">
                        <span className={styles.textDanger}>3,000</span> کیلوگرم (هر کیلوگرم 50,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.activityWrapperActionSingleDanger}>
                  <div className={styles.activity3dotsMenu}>15,000,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/2/">
                        <span className={styles.textDanger}>3,000</span> کیلوگرم (هر کیلوگرم 50,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.activityWrapperActionSingleDanger}>
                  <div className={styles.activity3dotsMenu}>15,000,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/2/">
                        <span className={styles.textDanger}>3,000</span> کیلوگرم (هر کیلوگرم 50,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.activityWrapperActionSingleDanger}>
                  <div className={styles.activity3dotsMenu}>15,000,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/2/">
                        <span className={styles.textDanger}>3,000</span> کیلوگرم (هر کیلوگرم 50,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.activityWrapperActionSingleDanger}>
                  <div className={styles.activity3dotsMenu}>15,000,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/2/">
                        <span className={styles.textDanger}>3,000</span> کیلوگرم (هر کیلوگرم 50,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.activityWrapperActionSingleDanger}>
                  <div className={styles.activity3dotsMenu}>15,000,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/2/">
                        <span className={styles.textDanger}>3,000</span> کیلوگرم (هر کیلوگرم 50,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.activityWrapperActionSingleDanger}>
                  <div className={styles.activity3dotsMenu}>15,000,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/2/">
                        <span className={styles.textDanger}>3,000</span> کیلوگرم (هر کیلوگرم 50,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.activityWrapperActionSingleDanger}>
                  <div className={styles.activity3dotsMenu}>15,000,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/2/">
                        <span className={styles.textDanger}>3,000</span> کیلوگرم (هر کیلوگرم 50,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.activityWrapperActionSingleDanger}>
                  <div className={styles.activity3dotsMenu}>15,000,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/2/">
                        <span className={styles.textDanger}>3,000</span> کیلوگرم (هر کیلوگرم 50,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.activityWrapperActionSingleDanger}>
                  <div className={styles.activity3dotsMenu}>15,000,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/2/">
                        <span className={styles.textDanger}>3,000</span> کیلوگرم (هر کیلوگرم 50,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.activityWrapperActionSingleDanger}>
                  <div className={styles.activity3dotsMenu}>15,000,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/2/">
                        <span className={styles.textDanger}>3,000</span> کیلوگرم (هر کیلوگرم 50,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.activityWrapperActionSingleDanger}>
                  <div className={styles.activity3dotsMenu}>15,000,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/2/">
                        <span className={styles.textDanger}>3,000</span> کیلوگرم (هر کیلوگرم 50,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.activityWrapperActionSingleDanger}>
                  <div className={styles.activity3dotsMenu}>15,000,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/2/">
                        <span className={styles.textDanger}>3,000</span> کیلوگرم (هر کیلوگرم 50,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.activityWrapperActionSingleDanger}>
                  <div className={styles.activity3dotsMenu}>15,000,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/2/">
                        <span className={styles.textDanger}>3,000</span> کیلوگرم (هر کیلوگرم 50,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.activityWrapperActionSingleDanger}>
                  <div className={styles.activity3dotsMenu}>15,000,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/2/">
                        <span className={styles.textDanger}>3,000</span> کیلوگرم (هر کیلوگرم 50,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.activityWrapperActionSingleDanger}>
                  <div className={styles.activity3dotsMenu}>15,000,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/2/">
                        <span className={styles.textDanger}>3,000</span> کیلوگرم (هر کیلوگرم 50,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.activityWrapperActionSingleDanger}>
                  <div className={styles.activity3dotsMenu}>15,000,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/2/">
                        <span className={styles.textDanger}>3,000</span> کیلوگرم (هر کیلوگرم 50,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.activityWrapperActionSingleDanger}>
                  <div className={styles.activity3dotsMenu}>15,000,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/2/">
                        <span className={styles.textDanger}>3,000</span> کیلوگرم (هر کیلوگرم 50,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.activityWrapperActionSingleDanger}>
                  <div className={styles.activity3dotsMenu}>15,000,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/2/">
                        <span className={styles.textDanger}>3,000</span> کیلوگرم (هر کیلوگرم 50,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.activityWrapperActionSingleDanger}>
                  <div className={styles.activity3dotsMenu}>15,000,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/2/">
                        <span className={styles.textDanger}>3,000</span> کیلوگرم (هر کیلوگرم 50,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.activityWrapperActionSingleDanger}>
                  <div className={styles.activity3dotsMenu}>15,000,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/2/">
                        <span className={styles.textDanger}>3,000</span> کیلوگرم (هر کیلوگرم 50,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.activityWrapperActionSingleDanger}>
                  <div className={styles.activity3dotsMenu}>15,000,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/2/">
                        <span className={styles.textDanger}>3,000</span> کیلوگرم (هر کیلوگرم 50,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.activityWrapperActionSingleDanger}>
                  <div className={styles.activity3dotsMenu}>15,000,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/2/">
                        <span className={styles.textDanger}>3,000</span> کیلوگرم (هر کیلوگرم 50,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.activityWrapperActionSingleDanger}>
                  <div className={styles.activity3dotsMenu}>15,000,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/2/">
                        <span className={styles.textDanger}>3,000</span> کیلوگرم (هر کیلوگرم 50,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.activityWrapperActionSingleDanger}>
                  <div className={styles.activity3dotsMenu}>15,000,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/2/">
                        <span className={styles.textDanger}>3,000</span> کیلوگرم (هر کیلوگرم 50,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.activityWrapperActionSingleDanger}>
                  <div className={styles.activity3dotsMenu}>15,000,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/2/">
                        <span className={styles.textDanger}>3,000</span> کیلوگرم (هر کیلوگرم 50,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.activityWrapperActionSingleDanger}>
                  <div className={styles.activity3dotsMenu}>19,500,000 تومان</div>
                  <div className={styles.activityMetaText}>
                    <div className={styles.textDark}>
                      <a href="/catalogue/product/detail/1/">
                        <span className={styles.textDanger}>2,500</span> کیلوگرم (هر کیلوگرم 78,000 ریال)
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalMarket;
