import { useCallback } from "react";
import styles from "./Toast.module.css";

const Toast = ({ list, position }) => {
  return (
    <div className={`${styles.container} ${styles[position]}`}>
      {list.map((toast, i) => (
        <div
          key={i}
          className={`${styles.notification} ${styles.toast} ${styles[position]}`}
          style={{ backgroundColor: toast.backgroundColor }}
        >
          <div>
            <p className={styles.title}>{toast.title}</p>
            <p className={styles.description}>{toast.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toast;
