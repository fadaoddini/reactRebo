import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./style_card_bazar.module.css";
import Loading from "../loading/index";
import CountdownTimer from "../timer/CountdownTimer";
import clock from "../../assets/images/clock.png"

const CardReboBazar = () => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let params = {
          sortby: "highestWeight",
          type: "sell"
        };

        const res = await axios.post("https://rebo.ir/catalogue/sortby", params, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log("cardReboBazar========================line20");
        console.log(res.data);
        setItems(res.data);
      } catch (err) {
        console.error("An error occurred while fetching data:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        items.map((item) => <Card key={item.id} item={item} />)
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
      <h1>{item.name_type}</h1>
      <div className={styles.top_bider_price_green}>
        بالاترین پیشنهاد :<span>{item.price}</span> ریال
      </div>
      <div className={styles.price_green}>
        قیمت :<span>{item.price}</span> ریال
      </div>
      <div className={styles.package_green}>
        بسته بندی :<span>کارتن 5 کیلویی</span>
      </div>
      <div className={styles.weight_green}>
        وزن :<span>{item.weight}</span> کیلوگرم
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
