import styles from "./PlannerNav.module.scss";
import AddTrip from "./features/addTrip/AddTrip";

import TripList from "./TripList";
import { useTrip } from "../context/NewTripContext";

function PlannerNav() {
  const { trips } = useTrip();

  return (
    <div className={styles.nav}>
      <AddTrip />
      {trips.length > 0 && <TripList />}
    </div>
  );
}

export default PlannerNav;
