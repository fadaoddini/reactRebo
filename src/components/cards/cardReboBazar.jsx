import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./style_card_bazar.module.css";
import Loading from "../loading/index";
import CountdownTimer from "../timer/CountdownTimer";
import clock from "../../assets/images/clock.png"

const CardReboBazar = () => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("https://rebo.ir/").then((res) => {
      setItems(res.data.categories);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        items.map((item) => <Card key={item.ID} item={item} />)
      )}
    </div>
  );
};

const Card = ({ item }) => {
  const targetDate = new Date(new Date().getTime() + (0.5 * 24 * 60 * 60 * 1000) + (3 * 60 * 60 * 1000));
  return (
    <div className={styles.card_bazar_green}>
      <img
        src="https://images.unsplash.com/photo-1606830733744-0ad778449672?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzl8fGNocmlzdG1hcyUyMHRyZWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        alt=""
      />
      <h1>خرمای مضافتی درجه یک</h1>
      <div className={styles.top_bider_price_green}>
        بالاترین پیشنهاد :<span>78000</span> تومان
      </div>
      <div className={styles.price_green}>
        قیمت :<span>73000</span> تومان
      </div>
      <div className={styles.package_green}>
        بسته بندی :<span>کارتن 5 کیلویی</span>
      </div>
      <div className={styles.weight_green}>
        وزن :<span>500</span> کیلوگرم
      </div>
      <div className={styles.timer_green}>
        <div className={styles.timer_title_green}>
        <CountdownTimer targetDate={targetDate} />
        </div>
        <div className={styles.timer_icon_green}>
          <img
            src={clock}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default CardReboBazar;
