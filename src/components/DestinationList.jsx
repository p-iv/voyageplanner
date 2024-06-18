import { useState } from "react";
import { useAutoComplete } from "../context/AutocompleteContext";
import AutocompleteItem from "./AutocompleteItem";
import styles from "./DestinationList.module.css";
import { Button } from "antd";

function DestinationList() {
  const { dispatch, autocomplete } = useAutoComplete();
  const [chosenDestination, setChosenDestination] = useState("");
  const [query, setQuery] = useState("");

  console.log(chosenDestination);

  function handleChange(e) {
    setQuery(e.target.value);
    dispatch({ type: "query/entered", payload: e.target.value });
  }

  return (
    <div className={styles.destinationlist}>
      <h1>1 Step: Choose your destination </h1>
      <input
        value={query}
        type="text"
        placeholder="enter city name..."
        onChange={handleChange}
      />

      {!autocomplete.length ? (
        ""
      ) : (
        <ul className={styles.autocompletelist}>
          {autocomplete.map((value) => (
            <AutocompleteItem
              dispatch={dispatch}
              setQuery={setQuery}
              setChosenDestination={setChosenDestination}
              value={value}
              key={value.place_id}
            />
          ))}
        </ul>
      )}
      {!chosenDestination ? (
        ""
      ) : (
        <div className={styles.yourdestination}>
          <h2>Your Destination: {chosenDestination}</h2>
          <Button type="primary">Next Step</Button>
        </div>
      )}
    </div>
  );
}

export default DestinationList;
