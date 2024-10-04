import { useState } from "react";
import { usePlace } from "../context/PlaceContext";
import { FilterOutlined } from "@ant-design/icons";
import styles from "./Filters.module.scss";
import Button from "../components/UI/Button";

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
            <div>
              <span>
                <FilterOutlined />
              </span>
              <h3>Filter by:</h3>
            </div>
            <Button type="primary" onClick={() => setShowFilters(false)}>
              X
            </Button>
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
          <Button onClick={handleApplyFilters} type="primary">
            Apply Filters
          </Button>
        </div>
      ) : (
        <span
          onClick={() => setShowFilters(true)}
          className={styles.filterButton}
        >
          <FilterOutlined /> Filters
        </span>
      )}
    </>
  );
};

export default Filters;
