import styles from "./PlannerNav.module.scss";
import AddTrip from "./features/addTrip/AddTrip";

import TripList from "./TripList";
// import { useTrip } from "../context/NewTripContext";

function PlannerNav() {
  return (
    <div className={styles.nav}>
      <AddTrip />
      <TripList />
    </div>
  );
}

export default PlannerNav;
