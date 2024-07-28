import styles from "./PlannerNav.module.css";
import AddTripForm from "./AddTripForm";

function PlannerNav() {
  return (
    <div className={styles.nav}>
      <AddTripForm />
    </div>
  );
}

export default PlannerNav;
