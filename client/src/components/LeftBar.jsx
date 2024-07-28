import PlannerNav from "./PlannerNav";
import styles from "./LeftBar.module.css";

function LeftBar() {
  return (
    <div className={styles.sidebar}>
      <PlannerNav />
    </div>
  );
}

export default LeftBar;
