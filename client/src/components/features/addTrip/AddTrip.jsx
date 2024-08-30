import { useState } from "react";
import styles from "./AddTrip.module.scss";
import AddTripForm from "./AddTripForm";

function AddTrip() {
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
        <AddTripForm setActiveForm={setActiveForm} activeForm={activeForm} />
      )}
    </div>
  );
}

export default AddTrip;
