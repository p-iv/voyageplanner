import { useState } from "react";
import { useDestination } from "../context/DestinationContext";
import AutocompleteItem from "./AutocompleteItem";
import styles from "./DestinationList.module.scss";

function DestinationList() {
  const { dispatch, autocomplete } = useDestination();

  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    dispatch({ type: "query/entered", payload: e.target.value });
  };

  return (
    <div className={styles.destinationList}>
      <input
        value={query}
        type="text"
        placeholder="enter city name..."
        onChange={handleChange}
      />

      {!autocomplete.length ? (
        ""
      ) : (
        <ul className={styles.autocompleteList}>
          {autocomplete.map((value) => (
            <AutocompleteItem
              dispatch={dispatch}
              setQuery={setQuery}
              value={value}
              key={value.place_id}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default DestinationList;
