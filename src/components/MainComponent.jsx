import { Outlet } from "react-router-dom";
import PlannerNav from "./PlannerNav";
import styles from "./MainComponent.module.css";

function MainComponent() {
  return (
    <div className={styles.sidebar}>
      <PlannerNav />

      <Outlet />
    </div>
  );
}

export default SideBar;
