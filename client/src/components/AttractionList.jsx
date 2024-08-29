import styles from "./AttractionList.module.css";
import AttractionItem from "./AttractionItem";
import { usePlace } from "../context/PlaceContext";
import Spinner from "../components/UI/Spinner";
import DestinationNav from "./DestinationNav";
import Filters from "./Filters";
function AttractionList() {
  const { places, isLoading } = usePlace();
  return (
    <>
      <DestinationNav />
      <Filters />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {places.length === 0 ? (
            <h3 className={styles.message}>First Choose a destination</h3>
          ) : (
            <ul className={styles.attractionList}>
              {places?.map((place) => (
                <AttractionItem place={place} key={place.place_id} />
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
}

export default AttractionList;
