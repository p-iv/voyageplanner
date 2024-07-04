import styles from "./AttractionList.module.css";
import AttractionItem from "./AttractionItem";
import { usePlace } from "../context/PlaceContext";
import Filters from "./Filters";

function AttractionList() {
  const { places } = usePlace();
  return (
    <>
      {/* <Filters /> */}
      <ul className={styles.attractionList}>
        {places.map((place) => (
          <AttractionItem place={place} key={place.place_id} />
        ))}
      </ul>
    </>
  );
}

export default AttractionList;
