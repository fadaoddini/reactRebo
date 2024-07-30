import React, { useEffect, useState }
 from "react";
import axios from "axios";
import styles from "./style_card_2.module.css";
const CardTwo = () => {
  const [items, setItems] = useState([]);
  const getData = () => {
    axios.get("https://pastry.alirezaahmadi.info/api/v1/cats").then((res) => {
      setItems(res.data.categories);
    }
);
  }
;
  useEffect(() => {
    getData();
  }
, []);
  return (
    <div className={styles.wrapper}
 >
      {items.map((item) => {
        return (
          <div id={styles.card_2}
 key={item.ID}
>	
	
          <div className={styles.product_details}
>
            
          <h1>{item.title}
</h1>
          {/* <span className={styles.hint_star star}
>
            <i className={styles.fa fa_star}
 aria-hidden="true"></i>
            <i className={styles.fa fa_star}
 aria-hidden="true"></i>
            <i className={styles.fa fa_star}
 aria-hidden="true"></i>
            <i className={styles.fa fa_star}
 aria-hidden="true"></i>
            <i className={styles.fa fa_star_o}
 aria-hidden="true"></i>
          </span> */}

            
              <p className={styles.information}
>
                بهترین محصول باغات بم
                </p>
        
            
            
        <div className={styles.control}
>
          
          <button className={styles.btn}
>
           <span className={styles.price}
>87000 تومان</span>
           <span className={styles.shopping_cart}
>
            <i class="fa fa-shopping_cart" aria-hidden="true"></i>
            </span>
           <span className={styles.buy}
>جزئیات</span>
         </button>
          
        </div>
              
        </div>
          
        <div className={styles.product_image}
>
          
          <img src="https://images.unsplash.com/photo-1606830733744-0ad778449672?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzl8fGNocmlzdG1hcyUyMHRyZWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" />
          
        
        <div className={styles.info}
>
          <h2> توضیحات</h2>
          <ul>
            <li><strong>وزن : </strong>2500 کیلوگرم </li>
            <li><strong>نوع : </strong>خرمای مضافتی</li>
            <li><strong>رنگ: </strong>مشکی</li>
            <li><strong>محصول: </strong>امسالی</li>
            
          </ul>
        </div>
        </div>
        
        </div>
        
           

        );
      }
)}

    </div>
  );
}
;

export default CardTwo;
