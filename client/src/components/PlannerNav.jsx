import styles from "./PlannerNav.module.scss";
import AddTrip from "./features/addTrip/AddTrip";

import TripList from "./TripList";

function PlannerNav() {
  return (
    <div className={styles.nav}>
      <AddTrip />
      <TripList />
    </div>
  );
}

export default PlannerNav;
