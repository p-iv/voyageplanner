import { useState } from "react";
import { usePlace } from "../context/PlaceContext";
import { FilterOutlined } from "@ant-design/icons";
import styles from "./Filters.module.scss";

const filterOptions = [
  { label: "Tourist Attractions", value: "tourist_attraction" },
  { label: "Restaurants", value: "restaurant" },
  { label: "Hotels", value: "lodging" },
  { label: "Cafes", value: "cafe" },
  { label: "Museums", value: "museum" },
  { label: "Parks", value: "park" },
  { label: "Shopping", value: "shopping_mall" },
  { label: "Nightlife", value: "night_club" },
];

const Filters = () => {
  const { dispatch } = usePlace();
  const [selectedFilters, setSelectedFilters] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    setSelectedFilters(value);
  };

  const handleApplyFilters = () => {
    if (selectedFilters != "") {
      dispatch({ type: "filter/changed", payload: selectedFilters });
      setShowFilters(false);
    }
  };

  return (
    <>
      {showFilters ? (
        <div className={styles.filters}>
          <div className={styles.filterHeader}>
            <span>
              <FilterOutlined />
            </span>
            <h3 className={styles.filterTitle}>Filter by:</h3>
          </div>

          {filterOptions.map((filter) => (
            <label key={filter.value} className={styles.filterLabel}>
              <input
                type="checkbox"
                value={filter.value}
                checked={selectedFilters.includes(filter.value)}
                onChange={handleCheckboxChange}
              />
              <span>{filter.label}</span>
            </label>
          ))}
          <button onClick={handleApplyFilters} className={styles.applyButton}>
            Apply Filters
          </button>
        </div>
      ) : (
        <span onClick={() => setShowFilters(true)}>
          <FilterOutlined />
        </span>
      )}
    </>
  );
};

export default Filters;
