import React, { useEffect, useState }
 from "react";
import axios from "axios";
import styles from "./style_card_1.module.css";
const CardOne = () => {
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

            <div className={styles.box}
 key={item.ID}
>
            <div className={styles.box_icon}
>
            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg>
            </div>
            <div className={styles.box_label}
>{item.title}
</div>
            <div className={styles.box_title}
>{item.title}
</div>
            <div className={styles.box_image}
>
              <img src={item.thumbnail}
 alt={item.title}
 />
            </div>
            <div className={styles.studio_button}
>
              <div className={styles.studio_button_icon}
>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>
              </div>
              <div className={styles.studio_button_label}
>
                مشاهده جزئیات
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

export default CardOne;
