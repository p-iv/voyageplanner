import { useTrip } from "../../../context/NewTripContext";
import styles from "./AddedDestination.module.scss";

import Image from "../../UI/Image";

const API_KEY = "AIzaSyAUgy97d-8V-p70KKlbyVR3MFQxUnqoGGI";

function AddedDestination({ destination }) {
  const { dispatch } = useTrip();

  const handleDeleteDestination = () => {
    dispatch({ type: "delete/destination", payload: destination.id });
  };

  return (
    <div>
      <div className={styles.addedDestination}>
        <p>{destination.name}</p>
        <button onClick={handleDeleteDestination}>x</button>
      </div>

      <ul className={styles.addedAttractions}>
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
  );
}

export default AddedDestination;
