import { SearchOutlined } from "@ant-design/icons";
import styles from "./AutocompleteItem.module.css";

function AutocompleteItem({ value, setChosenDestination, setQuery, dispatch }) {
  const { description } = value;

  function handleClick() {
    setChosenDestination(description);
    setQuery(() => "");
    dispatch({ type: "query/entered", payload: "" });
  }
  return (
    <div className={styles.autocomleteitem} onClick={handleClick}>
      <SearchOutlined />
      <h3>{description}</h3>
    </div>
  );
}

export default AutocompleteItem;
