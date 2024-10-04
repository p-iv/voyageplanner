import { useTrip } from "../../../context/NewTripContext";
import AddedAttractions from "./AddedAttractions";
import styles from "./PossibleAddedDestination.module.scss";

function PossibleAddedDestination({ deleteAttraction }) {
  const { attractions, destination } = useTrip();

  return (
    <div className={styles.possibleAddedDestination}>
      <p className={styles.destinationName}>You are adding: {destination}.</p>
      <AddedAttractions
        attractions={attractions}
        deleteAttraction={deleteAttraction}
      />
    </div>
  );
}

export default PossibleAddedDestination;
