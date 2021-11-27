import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import store from '../../redux/store';

const ToggleBuySellSwitch = () => {
  const [checked, setChecked] = useState(false);
  const handleChange = (event: {
    target: { id: String };
    preventDefault: Function;
  }) => {
    setChecked(!checked)
    if (!checked) {
      store.dispatch({ type: "SET_EXCHANGEBUY" });
    } else {
      store.dispatch({ type: "SET_EXCHANGESELL" });
    }
  };
  useEffect(() => {
    store.dispatch({ type: "SET_EXCHANGEBUY" });
  }, [])

  return (
    <div className={`${styles.switch_button_wrapper} d-flex align-items-center justify-content-center pb-3`}>
      <div className={styles.switch_button}>
        <input
          checked={checked}
          onChange={handleChange}
          className={styles.switch_button_checkbox}
          type="checkbox"
        ></input>
        <label className={styles.switch_button_label}>
          <span className={styles.switch_button_label_span}>Buy</span>
        </label>
      </div>
    </div>
  );
};

export default ToggleBuySellSwitch;
