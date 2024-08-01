import React from "react";
import styles from "./card_vertical.module.css";

const products = [
  { id: 1, title: "محصول 1", price: 50000, discountPrice: 40000, package: "مادر کارتن", weight: 10, image: "", discount: 20, deliveryLimit: "تا 5 روز", category: "Mozafati", featured: true },
  { id: 2, title: "محصول 2", price: 60000, discountPrice: 50000, package: "کارتن", weight: 5, image: "", discount: 17, deliveryLimit: "تا 3 روز", category: "Rabbi", featured: true },
  { id: 3, title: "محصول 3", price: 70000, discountPrice: 60000, package: "جعبه", weight: 2, image: "", discount: 14, deliveryLimit: "تا 4 روز", category: "Piarom", featured: true },
  { id: 4, title: "محصول 4", price: 80000, discountPrice: 70000, package: "بسته", weight: 1, image: "", discount: 12, deliveryLimit: "تا 2 روز", category: "Others", featured: true },
  { id: 5, title: "محصول 5", price: 90000, discountPrice: 85000, package: "بسته", weight: 3, image: "", discount: 5, deliveryLimit: "تا 1 روز", category: "Mozafati" },
  { id: 6, title: "محصول 6", price: 95000, discountPrice: 90000, package: "بسته", weight: 2, image: "", discount: 5, deliveryLimit: "تا 1 روز", category: "Rabbi" },
  { id: 7, title: "محصول 7", price: 80000, discountPrice: 75000, package: "بسته", weight: 5, image: "", discount: 5, deliveryLimit: "تا 1 روز", category: "Piarom" },
  { id: 8, title: "محصول 8", price: 65000, discountPrice: 60000, package: "بسته", weight: 2, image: "", discount: 5, deliveryLimit: "تا 1 روز", category: "Others" },
  { id: 1, title: "محصول 1", price: 50000, discountPrice: 40000, package: "مادر کارتن", weight: 10, image: "", discount: 20, deliveryLimit: "تا 5 روز", category: "Mozafati", featured: true },
  { id: 2, title: "محصول 2", price: 60000, discountPrice: 50000, package: "کارتن", weight: 5, image: "", discount: 17, deliveryLimit: "تا 3 روز", category: "Rabbi", featured: true },
  { id: 3, title: "محصول 3", price: 70000, discountPrice: 60000, package: "جعبه", weight: 2, image: "", discount: 14, deliveryLimit: "تا 4 روز", category: "Piarom", featured: true },
  { id: 4, title: "محصول 4", price: 80000, discountPrice: 70000, package: "بسته", weight: 1, image: "", discount: 12, deliveryLimit: "تا 2 روز", category: "Others", featured: true },
  { id: 5, title: "محصول 5", price: 90000, discountPrice: 85000, package: "بسته", weight: 3, image: "", discount: 5, deliveryLimit: "تا 1 روز", category: "Mozafati" },
  { id: 6, title: "محصول 6", price: 95000, discountPrice: 90000, package: "بسته", weight: 2, image: "", discount: 5, deliveryLimit: "تا 1 روز", category: "Rabbi" },
  { id: 7, title: "محصول 7", price: 80000, discountPrice: 75000, package: "بسته", weight: 5, image: "", discount: 5, deliveryLimit: "تا 1 روز", category: "Piarom" },
  { id: 8, title: "محصول 8", price: 65000, discountPrice: 60000, package: "بسته", weight: 2, image: "", discount: 5, deliveryLimit: "تا 1 روز", category: "Others" }
];

const CardVertical = ({ category }) => {
  const filteredProducts = products.filter(product => product.category === category);

  return (
    <div className={styles.wrapper}>
      {filteredProducts.map((product) => (
        <div key={product.id} className={styles.card_vertical}>
          {product.featured && (
            <div className={styles.featuredBadge}>
              ویژه
            </div>
          )}
          <div className={styles.discountBadge}>
            <span>{product.discount}%</span> تخفیف
          </div>
          <div className={styles.deliveryLimitBadge}>
            <span>{product.deliveryLimit}</span>
          </div>
          <img src={product.image} alt={product.title} />
          <h1>{product.title}</h1>
          <div className={styles.priceStyle}>
            قیمت کالا :<span>{product.price}</span> ریال
          </div>
          <div className={styles.discountPriceStyle}>
            قیمت با تخفیف :<span>{product.discountPrice}</span> ریال
          </div>
          <div className={styles.packageStyle}>
            بسته بندی :<span>{product.package}</span>
          </div>
          <div className={styles.weightStyle}>
            وزن :<span>{product.weight}</span> کیلوگرم
          </div>
          <div className={styles.fillBtnOrange}>افزودن به سبد خرید</div>
        </div>
      ))}
    </div>
  );
};

export default CardVertical;
