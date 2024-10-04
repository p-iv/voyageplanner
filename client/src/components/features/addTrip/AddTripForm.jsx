import { useState } from "react";
import { useTrip } from "../../../context/NewTripContext";
import styles from "./AddTripForm.module.scss";
import Button from "./../../UI/Button";
import AddDestination from "./AddDestination";
import { useNavigate } from "react-router-dom";

function AddTripForm({ setActiveForm, activeForm }) {
  const [tripName, setTripName] = useState("");
  const { dispatch, destinations, createTrip, activeDestinationForm } =
    useTrip();
  const navigate = useNavigate();

  const newTrip = {
    name: tripName.toUpperCase(),
    destinations: destinations,
  };

  const handleChange = (e) => {
    setTripName(e.target.value);
  };

  const handleSubmitTrip = (e) => {
    if (tripName !== "" && destinations.length != 0) {
      e.preventDefault();

      createTrip(newTrip);
      dispatch({ type: "set/attractions", payload: [] });
      dispatch({ type: "set/destinations", payload: [] });
      dispatch({ type: "set/activeDestinationForm", payload: false });
      setActiveForm(!activeForm);
      setTripName("");
    } else {
      alert("Please enter a trip name and add at least one destination");
    }
  };

  const handleCloseForm = () => {
    setActiveForm(false);
    dispatch({ type: "clear/data" });
    dispatch({
      type: "set/activeDestinationForm",
      payload: false,
    });
    navigate("/app");
  };

  return (
    <div className={styles.tripForm}>
      <Button
        type="close"
        className={styles.closeButton}
        onClick={handleCloseForm}
      >
        x
      </Button>

      <input
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
