import { useState } from "react";
import styles from "./AddTripForm.module.css";

import Button from "./../../UI/Button";

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
    <form className={styles.tripFrom} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a trip name"
        onChange={handleChange}
      />
      <Button type="primary">Add Trip</Button>
    </form>
  );
}

export default AddTripForm;
