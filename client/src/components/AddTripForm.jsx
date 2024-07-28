import { useState } from "react";
import styles from "./AddTripForm.module.css";

function AddTripForm() {
  const [activeForm, setActiveForm] = useState(false);
  return (
    <div className={styles.addTrip}>
      {!activeForm ? (
        <button
          onClick={() => setActiveForm(!activeForm)}
          className={styles.addTripButton}
        >
          Add Trip
        </button>
      ) : (
        <h1>Form</h1>
      )}
    </div>
  );
}

export default AddTripForm;
