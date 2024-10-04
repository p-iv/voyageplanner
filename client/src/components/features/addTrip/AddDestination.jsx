import { useState } from "react";
import { useTrip } from "../../../context/NewTripContext";
import styles from "./AddDestination.module.scss";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import AddedDestination from "./AddedDestination";
import PossibleAddedDestination from "./PossibleAddedDestination";

function AddDestination() {
  const [activeAddDestination, setActiveDestination] = useState(false);
  const { destination, attractions, destinations, dispatch } = useTrip();

  const tripDestination = {
    id: uuidv4(),
    name: destination,
    attractions: attractions,
  };

  const handleConfirmDestination = () => {
    setActiveDestination(!activeAddDestination);

    dispatch({
      type: "add/Destinations",
      payload: tripDestination,
    });

    dispatch({ type: "set/destination", payload: "" });

    dispatch({ type: "set/attractions", payload: [] });

    dispatch({
      type: "set/activeDestinationForm",
      payload: false,
    });
  };

  const handleActiveDestination = () => {
    setActiveDestination(!activeAddDestination);

    dispatch({
      type: "set/activeDestinationForm",
      payload: true,
    });
  };

  return (
    <>
      {destinations.length > 0 && (
        <div className={styles.destinationList}>
          {destinations.map((destination) => (
            <AddedDestination key={destination.id} destination={destination} />
          ))}
        </div>
      )}
      {!activeAddDestination ? (
        <Link to="destination">
          <button
            onClick={handleActiveDestination}
            className={styles.addDestinationButton}
          >
            Add Destination
          </button>
        </Link>
      ) : (
        <>
          {destination != "" && attractions.length != 0 ? (
            <>
              <PossibleAddedDestination deleteAttraction={true} />
              <Link to="/app">
                <button
                  onClick={handleConfirmDestination}
                  className={styles.confirmDestinationButton}
                >
                  Confirm Destination
                </button>
              </Link>
            </>
          ) : null}
        </>
      )}
    </>
  );
}

export default AddDestination;
