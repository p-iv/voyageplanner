import styles from "./PlannerNav.module.css";
import AddTrip from "./features/addTrip/AddTrip";

function PlannerNav() {
  return (
    <div className={styles.nav}>
      <AddTrip />
    </div>
  );
}

export default PlannerNav;
