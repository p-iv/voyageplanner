import styles from "./AttractionList.module.css";
import AttractionItem from "./AttractionItem";
import { usePlace } from "../context/PlaceContext";
import Spinner from "../components/UI/Spinner";
function AttractionList() {
  const { places, isLoading } = usePlace();
  return (
    <>
      //TODO: add filters
      {isLoading ? (
        <Spinner />
      ) : (
        <ul className={styles.attractionList}>
          {places?.map((place) => (
            <AttractionItem place={place} key={place.place_id} />
          ))}
        </ul>
      )}
    </>
  );
}

export default AttractionList;
