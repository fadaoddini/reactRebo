import React, { useState, useEffect } from "react";
import Loading from "../../components/loading";
import AddModalShop from "./AddModalShop";
import AddProductInShopModal from "./AddProductInShopModal";
import CardShop from "../../components/cardShop/cardShop";
import ShopCard from "./ShopCard";
import NotActiveProduct from "./notActive/ProductCard";
import VijeProduct from "./vije/ProductCard";
import ActiveProduct from "./active/ProductCard";
import {
  addShop,
  checkUserShop,
  fetchInactiveProducts,
  fetchActiveProducts,
  fetchFeaturedProducts,
} from "./shopUtils";
import styles from "./Shop.module.css";

const Shop = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasShop, setHasShop] = useState(false);
  const [shopData, setShopData] = useState(null);
  const [inactiveProducts, setInactiveProducts] = useState([]);
  const [activeProducts, setActiveProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("activeProducts"); // مدیریت تب فعال
  const [formData, setFormData] = useState({
    name_shop: "",
    administrator: "",
    mobile: "",
    code_posti: "",
    address: "",
    image: null,
  });

  useEffect(() => {
    const fetchUserShop = async () => {
      try {
        const result = await checkUserShop();
        if (result.shop_exists) {
          setHasShop(true);
          setShopData(result.shop);
        }
      } catch (error) {
        console.error("شما هنوز فروشگاهی ثبت نکرده‌اید.");
      }
    };

    const fetchProducts = async () => {
      try {
        const inactive = await fetchInactiveProducts();
        const active = await fetchActiveProducts();
        const featured = await fetchFeaturedProducts();
        setInactiveProducts(inactive);
        setActiveProducts(active);
        setFeaturedProducts(featured);
      } catch (error) {
        console.error("خطا در بارگذاری محصولات:", error);
      }
    };

    fetchUserShop();
    fetchProducts();
  }, []);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const toggleProductModal = () => {
    setIsProductModalOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await addShop(formData);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      toggleModal();
    }
  };

  // مدیریت رندر محصولات بر اساس تب فعال
  const renderProducts = () => {
    switch (activeTab) {
      case "activeProducts":
        return (
          <div className={styles.productCardContainer}>
            {activeProducts.length > 0 ? (
              activeProducts.map((product) => (
                <ActiveProduct key={product.id} product={product} />
              ))
            ) : (
              <p>محصولات فعال وجود ندارد.</p>
            )}
          </div>
        );
      case "inactiveProducts":
        return (
          <div className={styles.productCardContainer}>
            {inactiveProducts.length > 0 ? (
              inactiveProducts.map((product) => (
                <NotActiveProduct key={product.id} product={product} />
              ))
            ) : (
              <p>محصولات در حال بررسی وجود ندارد.</p>
            )}
          </div>
        );
      case "featuredProducts":
        return (
          <div className={styles.productCardContainer}>
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <VijeProduct key={product.id} product={product} />
              ))
            ) : (
              <p>محصولات ویژه وجود ندارد.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          
        <CardShop />
          <div className="card custom-card margin-top-5">
            {isLoading ? (
              <Loading />
            ) : (
              <div className="card-body">
                <div className={styles.tabButtons}>
                  <button
                    className={`${styles.tabButton} ${
                      activeTab === "featuredProducts" ? styles.active : ""
                    }`}
                    onClick={() => setActiveTab("featuredProducts")}
                  >
                    محصولات ویژه
                  </button>

                  <button
                    className={`${styles.tabButton} ${
                      activeTab === "activeProducts" ? styles.active : ""
                    }`}
                    onClick={() => setActiveTab("activeProducts")}
                  >
                    محصولات تائید شده
                  </button>
                  <button
                    className={`${styles.tabButton} ${
                      activeTab === "inactiveProducts" ? styles.active : ""
                    }`}
                    onClick={() => setActiveTab("inactiveProducts")}
                  >
                    محصولات در حال بررسی
                  </button>
                </div>
                {renderProducts()}
              </div>
            )}
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card custom-card margin-top-5">
            <div className="card-body rtl_fa">
              {hasShop ? (
                <div>
                  <ShopCard shopData={shopData} />
                  <button
                    className={styles.addProductButton}
                    onClick={toggleProductModal}
                  >
                    ثبت محصول جدید
                  </button>
                </div>
              ) : (
                <button className="btn btn-secondary" onClick={toggleModal}>
                  ثبت فروشگاه
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <AddModalShop
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        formData={formData}
      />

      <AddProductInShopModal
        isOpen={isProductModalOpen}
        toggleModal={toggleProductModal}
      />
    </div>
  );
};

export default Shop;
