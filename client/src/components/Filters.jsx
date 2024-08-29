import { useState } from "react";
import { usePlace } from "../context/PlaceContext";
import styles from "./Filters.module.css";

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

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    setSelectedFilters(value);
  };

  const handleApplyFilters = () => {
    if (selectedFilters != "")
      dispatch({ type: "filter/changed", payload: selectedFilters });
  };

  return (
    <div className="filters">
      <h3>Filter by:</h3>
      {filterOptions.map((filter) => (
        <label key={filter.value}>
          <input
            type="checkbox"
            value={filter.value}
            checked={selectedFilters.includes(filter.value)}
            onChange={handleCheckboxChange}
          />
          {filter.label}
        </label>
      ))}
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
};

export default Filters;
