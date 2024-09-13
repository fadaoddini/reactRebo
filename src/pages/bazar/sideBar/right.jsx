import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  fetchBidPermission,
  fetchProductData,
  fetchProductTypes,
} from "../../../components/Bazar/api/apiUtils";
import ProductList from "../../../components/Bazar/ProductList";
import SideBarBazar from "../../../components/Bazar/sidebar/SideBarBazar";
import AlertMessage from "../../../components/utils/AlertMessage";
import ModalMarket from "../../../components/utils/ModalBazar";
import ModalBids from "../../../components/utils/ModalBids";
import ModalReport from "../../../components/utils/ModalChart";
import ProductFormModal from "./forms/ProductFormModal";
import PaymentModal from "./PaymentModal";
import styles from "./right.module.css";

const RightSidebarIndex = ({ numBidMain }) => {
  const [modalShow, setModalShow] = useState(false);
  const [paymentModalShow, setPaymentModalShow] = useState(false);
  const [sellBuyType, setSellBuyType] = useState(null);
  const [productTypes, setProductTypes] = useState([]);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isMarketModalOpen, setIsMarketModalOpen] = useState(false);
  const [isBidsModalOpen, setIsBidsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [isDataAvailable, setIsDataAvailable] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [products, setProducts] = useState([]); // state برای محصولات
  const [message, setMessage] = useState("در حال بررسی وضعیت پیشنهاددهنده...");
  const [numBid, setNumBid] = useState(0);
  const jwtToken = sessionStorage.getItem("accessToken");

  const isAuthenticated = !!jwtToken; // بررسی ورود کاربر

  // دریافت مجوز پیشنهاد
  const loadBidPermission = async () => {
    try {
      const numBid = await fetchBidPermission(jwtToken);
      setNumBid(numBid);
    } catch (error) {
      setMessage(
        "شما در حال حاضر امکان ثبت پیشنهاد را ندارید، لطفا ابتدا پیشنهاد دهنده شوید"
      );
      setNumBid(0);
    }
  };

  // تابع برای بروزرسانی لیست محصولات پس از اضافه شدن محصول جدید
  const handleProductAdded = (newProduct) => {
    // اضافه کردن محصول جدید به لیست محصولات موجود
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
  };

  // دریافت اطلاعات محصولات
  const loadProductTypes = async () => {
    try {
      const types = await fetchProductTypes();
      setProductTypes(types);
      setIsDataAvailable(types.length > 0);
    } catch (error) {
      setIsDataAvailable(false);
    }
  };

  // واکشی محصولات از سرور
  const fetchUpdatedProducts = async () => {
    try {
      const updatedProducts = await fetchProductData(); // تابع برای واکشی محصولات از سرور
      setProducts(updatedProducts);
    } catch (error) {
      console.error("خطا در واکشی محصولات:", error);
    }
  };

  // هندل کردن کلیک‌ها برای گزارش‌ها، بازار و پیشنهادات
  const handleDataClick = async (id, title, setModalOpen) => {
    try {
      const data = await fetchProductData(id);
      if (data && data.min_prices.length > 0) {
        setSelectedProductId(id);
        setModalTitle(title);
        setModalOpen(true);
      } else {
        setErrorMessage(`متاسفانه داده‌ای برای ${title} به ثبت نرسیده است.`);
        setShowAlert(true);
      }
    } catch (error) {
      setErrorMessage(`متاسفانه داده‌ای برای ${title} به ثبت نرسیده است.`);
      setShowAlert(true);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadBidPermission();
    }
  }, [isAuthenticated, numBidMain]);

  useEffect(() => {
    if (isAuthenticated) {
      loadProductTypes();
      fetchUpdatedProducts(); // واکشی محصولات به روز شده هنگام ورود کاربر
    }
  }, [isAuthenticated]);

  const handleClose = () => setModalShow(false);
  const handleClosePaymentModal = () => setPaymentModalShow(false);
  const handleAlertClose = () => setShowAlert(false);

  return (
    <div className="margin-top-5">
      {isAuthenticated && (
        <>
          <div className={styles.buttonContainer}>
            <Button
              className={styles.button_red}
              onClick={() => {
                setSellBuyType(1); // تنظیم مقدار برای فروش
                setModalShow(true);
              }}
            >
              فروش محصول
            </Button>
            <Button
              className={styles.button_green}
              onClick={() => {
                setSellBuyType(2); // تنظیم مقدار برای خرید
                setModalShow(true);
              }}
            >
              ثبت درخواست
            </Button>
          </div>

          <div className={styles.buttonRow}>
            {numBid > 0 ? (
              <Button className={styles.btn_bid_green}>
                شما پیشنهاد دهنده هستید
              </Button>
            ) : (
              <button
                type="button"
                className={styles.btn_bid}
                onClick={(e) => {
                  e.preventDefault();
                  setPaymentModalShow(true);
                }}
              ></button>
            )}
          </div>
        </>
      )}
      <div className="card custom-card margin-top-5">
        <div className="card-body rtl_fa">
          <ProductList
            products={products} // ارسال لیست محصولات به ProductList
            productTypes={productTypes}
            handleReportClick={(id, title) =>
              handleDataClick(id, title, setIsReportModalOpen)
            }
            handleMarketClick={(id, title) =>
              handleDataClick(id, title, setIsMarketModalOpen)
            }
            handleBidsClick={(id, title) =>
              handleDataClick(id, title, setIsBidsModalOpen)
            }
          />
          {isAuthenticated && (
            <>
              <ProductFormModal
                show={modalShow}
                handleClose={handleClose}
                sellBuyType={sellBuyType}
                onProductAdded={handleProductAdded} // ارسال تابع بروزرسانی محصولات
              />
              <SideBarBazar
                refreshProducts={fetchUpdatedProducts} // ارسال تابع بروزرسانی به SideBarBazar
              />
            </>
          )}
          <ModalReport
            isOpen={isReportModalOpen}
            onClose={() => setIsReportModalOpen(false)}
            productId={selectedProductId}
            title={modalTitle}
          />
          <ModalMarket
            isOpen={isMarketModalOpen}
            onClose={() => setIsMarketModalOpen(false)}
            productId={selectedProductId}
            title={modalTitle}
          />
          <ModalBids
            isOpen={isBidsModalOpen}
            onClose={() => setIsBidsModalOpen(false)}
            productId={selectedProductId}
            title={modalTitle}
          />
          <PaymentModal
            show={paymentModalShow}
            handleClose={handleClosePaymentModal}
          />
          <AlertMessage
            message={errorMessage}
            onClose={handleAlertClose}
            isOpen={showAlert}
          />
        </div>
      </div>
    </div>
  );
};

export default RightSidebarIndex;
