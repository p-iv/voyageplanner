import { SearchOutlined } from "@ant-design/icons";
import styles from "./AutocompleteItem.module.css";
import { Link } from "react-router-dom";

function AutocompleteItem({ value, setQuery, dispatch }) {
  const { description, place_id } = value;

  function handleClick() {
    setQuery(() => "");
    dispatch({ type: "query/entered", payload: "" });
  }
  return (
    <li>
      <Link
        className={styles.autocomleteitem}
        onClick={handleClick}
        to={`${place_id}`}
      >
        <SearchOutlined />
        <h3>{description}</h3>
      </Link>
    </li>
  );
}

export default AutocompleteItem;
