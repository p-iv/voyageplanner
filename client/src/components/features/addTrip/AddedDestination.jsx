import { useTrip } from "../../../context/NewTripContext";
import styles from "./AddedDestination.module.scss";

import AddedAttractions from "./AddedAttractions";
import Button from "../../UI/Button";

function AddedDestination({ destination }) {
  const { dispatch } = useTrip();

  const handleDeleteDestination = () => {
    dispatch({ type: "delete/destination", payload: destination.id });
  };

  return (
    <div>
      <div className={styles.addedDestination}>
        <p>{destination.name}</p>
        <Button type="close" onClick={handleDeleteDestination}>
          x
        </Button>
      </div>

      <AddedAttractions
        deleteAttraction={false}
        attractions={destination.attractions}
      />
    </div>
  );
}

export default AddedDestination;
