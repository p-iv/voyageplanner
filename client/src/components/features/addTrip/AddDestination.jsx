import { useState } from "react";
import styles from "./AddDestination.module.css";
import { Link } from "react-router-dom";
import Button from "../../UI/Button";
import { useTrip } from "../../../context/NewTripContext";
import { v4 as uuidv4 } from "uuid";
import Image from "../../UI/Image";

const API_KEY = "AIzaSyAUgy97d-8V-p70KKlbyVR3MFQxUnqoGGI";

function AddDestination() {
  const [activeAddDestination, setActiveDestination] = useState(false);
  const { destination, attractions, destinations, dispatch } = useTrip();

  const tripDestination = {
    id: uuidv4(),
    name: destination,
    attractions: attractions,
  };

  function handleConfirmDestination() {
    setActiveDestination(!activeAddDestination);

    dispatch({
      type: "add/Destinations",
      payload: [...destinations, tripDestination],
    });

    dispatch({ type: "set/destination", payload: "" });

    dispatch({ type: "set/attractions", payload: [] });

    dispatch({
      type: "set/activeDestinationForm",
      payload: false,
    });
  }

  function handleActiveDestination() {
    setActiveDestination(!activeAddDestination);

    dispatch({
      type: "set/activeDestinationForm",
      payload: true,
    });
  }

  return (
    <>
      {destinations.length > 0 && (
        <div className={styles.destinationList}>
          <h2>Added Destinations:</h2>
          {destinations.map((destination) => (
            <div key={destination.id}>
              <h3>{destination.name}</h3>
              <ul className={styles.addedDestination}>
                {destination.attractions.map((attraction) => (
                  <li key={attraction.id}>
                    <Image
                      alt_text="attraction image"
                      type="addedAttractionImage"
                      source={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${attraction.photos[0].photo_reference}&key=${API_KEY}`}
                    />
                    <p>{attraction.name}</p>
                  </li>
                ))}
              </ul>
            </div>
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
            <Link to="/app">
              <Button type="primary" onClick={handleConfirmDestination}>
                Confirm Destination
              </Button>
            </Link>
          ) : null}
        </>
      )}
    </>
  );
}

export default AddDestination;
