import { useState } from "react";
import styles from "./AddTripForm.module.css";

import Button from "./../../UI/Button";
import AddDestination from "./AddDestination";

function AddTripForm({ setActiveForm, activeForm }) {
  const [tripNAme, setTripName] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setTripName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    // Add trip logic here
    setActiveForm(!activeForm);
    setTripName(""); // Clear the input field after submission
  }
  return (
    <div className={styles.tripForm}>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter a trip name"
        onChange={handleChange}
      />
      <AddDestination />
      <Button type="primary" onClick={handleSubmit}>
        Add Trip
      </Button>
    </div>
  );
}

export default AddTripForm;
