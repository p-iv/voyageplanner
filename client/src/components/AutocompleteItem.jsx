import { SearchOutlined } from "@ant-design/icons";
import styles from "./AutocompleteItem.module.scss";
import { Link } from "react-router-dom";

function AutocompleteItem({ value, setQuery, dispatch }) {
  const { description, place_id } = value;

  const handleClick = () => {
    setQuery(() => "");
    dispatch({ type: "query/entered", payload: "" });
  };

  return (
    <li>
      <Link
        className={styles.autoCompleteItem}
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
