import { useState } from "react";
import styles from "./Trip.module.css";
import TripDestination from "./TripDestination";

function Trip({ trip }) {
  const [activeViewDestinations, setActiveViewDestinations] = useState(false);

  function handleViewDestinations() {
    setActiveViewDestinations(!activeViewDestinations);
  }
  return (
    <li className={styles.tripItem}>
      <div className={styles.trip}>
        <p>{trip.name}</p>
        <div className={styles.buttons}>
          <button
            className={styles.viewDestinationsButton}
            onClick={handleViewDestinations}
          >
            {activeViewDestinations
              ? "Close Destinations"
              : "View Destinations"}
          </button>
          <button className={styles.deleteDestinationButton}>
            Delete Trip
          </button>
        </div>
      </div>
      {activeViewDestinations && (
        <ul className={styles.destinations}>
          {trip.destinations.map((destination) => (
            <TripDestination key={destination.id} destination={destination} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default Trip;
