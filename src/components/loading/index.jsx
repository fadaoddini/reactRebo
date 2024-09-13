import React from "react";
import styles from "./loading.module.css"
const Loading = () => {
  return (
    <div className={styles.formLoader}
>
      <ul className={styles.formLoading}
>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}
;

export default Loading;
