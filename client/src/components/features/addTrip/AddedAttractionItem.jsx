import styles from "./AddedAttractionItem.module.scss";
import { useTrip } from "../../../context/NewTripContext";
import Button from "../../UI/Button";
import Image from "../../UI/Image";

const API_KEY = "AIzaSyAUgy97d-8V-p70KKlbyVR3MFQxUnqoGGI";

function AddedAttractionItem({ deleteAttraction, attraction }) {
  const { dispatch } = useTrip();

  const handleDeleteAttraction = () => {
    dispatch({ type: "delete/attraction", payload: attraction.place_id });
  };

  return (
    <li key={attraction.id}>
      <Image
        alt_text="attraction image"
        type="addedAttractionImage"
        source={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${attraction.photos[0].photo_reference}&key=${API_KEY}`}
      />
      <div className={styles.name}>
        <p>{attraction.name}</p>
        {deleteAttraction && (
          <Button type="close" onClick={handleDeleteAttraction}>
            x
          </Button>
        )}
      </div>
    </li>
  );
}

export default AddedAttractionItem;
