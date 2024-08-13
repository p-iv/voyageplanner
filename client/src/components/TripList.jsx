import { useTrip } from "../context/NewTripContext";
import Trip from "./Trip";
import styles from "./TripList.module.css";

function TripList() {
  const { trips } = useTrip();
  return (
    <ul className={styles.tripList}>
      {trips?.map((trip) => (
        <Trip key={trip.id} trip={trip} />
      ))}
    </ul>
  );
}

export default TripList;
