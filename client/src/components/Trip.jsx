import { useState } from "react";
import { useTrip } from "../context/NewTripContext";

import styles from "./Trip.module.scss";
import TripDestination from "./TripDestination";

function Trip({ trip }) {
  const [activeViewDestinations, setActiveViewDestinations] = useState(false);
  const { dispatch, selectedTrip, deleteTrip } = useTrip();

  const handleViewDestinations = () => {
    setActiveViewDestinations(!activeViewDestinations);
    if (selectedTrip === trip._id) {
      dispatch({ type: "set/selectedTrip", payload: null });
    } else {
      dispatch({ type: "set/selectedTrip", payload: trip._id });
    }
  };

  const handleDeleteTrip = () => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      deleteTrip(trip._id);
    }
  };

  return (
    <li className={styles.tripItem}>
      <div className={styles.trip}>
        <p>{trip.name}</p>
        <div className={styles.buttons}>
          <button
            className={styles.viewDestinationsButton}
            onClick={handleViewDestinations}
          >
            {activeViewDestinations ? "Hide Destinations" : "Show Destinations"}
          </button>
          <button
            className={styles.deleteDestinationButton}
            onClick={handleDeleteTrip}
          >
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
