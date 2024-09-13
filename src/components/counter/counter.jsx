import React,{useState}
 from "react";
import styles from "./counter.module.css";

const Counter = ({defaultCounter}
) => {
  const[counter,setCounter] = useState(defaultCounter)
  
  const plusNum = ()=>{
    if (counter>9){
      setCounter(counter) 
    }
else{
      setCounter(counter+1) 
    }

  }


  const lessNum = ()=>{
    if(counter<2){
      setCounter(counter)
    }
else{
      setCounter(counter-1)
    }

  }

  return (
    <div>
      <div className={styles.handle_counter}
 id={styles.handleCounter1}
>
        {counter !== 1 ? <button className={`${styles.counter_minus}
 ${styles.btn}
 ${styles.btn_light}
`}
 onClick={lessNum}
>-</button> : null}

        <input type="text" value={counter}
 />
        
        <button className={`${styles.counter_plus}
 ${styles.btn}
 ${styles.btn_light}
`}
 onClick={plusNum}
>+</button>
        
      </div>
      {counter === 1 ? <span>حداقل سفارش یک می باشد</span> : null}

    </div>
  );
}
;

export default Counter;
