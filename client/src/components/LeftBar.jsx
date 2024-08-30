import PlannerNav from "./PlannerNav";
import styles from "./LeftBar.module.scss";

function LeftBar() {
  return (
    <div className={styles.sidebar}>
      <PlannerNav />
    </div>
  );
}

export default LeftBar;
