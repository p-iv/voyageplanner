import { Outlet } from "react-router-dom";
import PlannerNav from "./PlannerNav";
import styles from "./SideBar.module.css";

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <PlannerNav />

      <Outlet />
    </div>
  );
}

export default SideBar;
