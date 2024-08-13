import { useState } from "react";
import styles from "./AddTripForm.module.css";
import { v4 as uuidv4 } from "uuid";
import Button from "./../../UI/Button";
import AddDestination from "./AddDestination";
import { useTrip } from "../../../context/NewTripContext";
import { usePlace } from "../../../context/PlaceContext";

function AddTripForm({ setActiveForm, activeForm }) {
  const [tripName, setTripName] = useState("");

  const { dispatch, destinations, attractions } = useTrip();

  const newTrip = {
    id: uuidv4(),
    name: tripName.toUpperCase(),
    destinations: destinations,
  };

  function handleChange(e) {
    e.preventDefault();
    setTripName(e.target.value);
  }

  function handleSubmitTrip(e) {
    if (tripName !== "" && destinations.length != 0) {
      e.preventDefault();

      dispatch({ type: "add/trip", payload: newTrip });
      dispatch({ type: "set/destinations", payload: [] });
      setActiveForm(!activeForm);
      setTripName("");
    } else {
      alert("Please enter a trip name and add at least one destination");
    }
  }

  return (
    <div className={styles.tripForm}>
      <input
        className={styles.input}
        value={tripName}
        type="text"
        placeholder="Enter a trip name"
        onChange={handleChange}
      />
      <AddDestination />
      <Button type="primary" onClick={handleSubmitTrip}>
        Add Trip
      </Button>
    </div>
  );
}

export default AddTripForm;
