import styles from "./AttractionList.module.css";
import AttractionItem from "./AttractionItem";
import { usePlace } from "../context/PlaceContext";

function AttractionList() {
  const { places } = usePlace();
  return (
    <div className={styles.attractionList}>
      {places.map((place) => (
        <AttractionItem place={place} key={place.place_id} />
      ))}
    </div>
  );
}

export default AttractionList;
