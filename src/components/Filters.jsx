import { BarsOutlined } from "@ant-design/icons";
import styles from "./Filters.module.css";
import { Button } from "antd";
import { useState } from "react";

function Filters() {
  const [activeFilters, setActiveFilters] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setActiveFilters(!activeFilters);
    console.log(input["checkbox"].checked.value);
  }
  return (
    <div>
      {!activeFilters ? (
        <div
          onClick={() => setActiveFilters(!activeFilters)}
          className={styles.filtersButton}
        >
          <BarsOutlined />
          <p>filters</p>
        </div>
      ) : (
        <div className={styles.filters}>
          <label>Tourist Attraction</label>
          <input
            className={styles.checkBox}
            type="checkbox"
            value="tourist_attraction"
          />
          <Button type="primary" onClick={handleSubmit}>
            Confirm
          </Button>
          <form></form>
        </div>
      )}
    </div>
  );
}

export default Filters;
