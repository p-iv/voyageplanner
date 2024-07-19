import { NavLink } from "react-router-dom";
import styles from "./PlannerNav.module.css";

function PlannerNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="destination">Destination</NavLink>
        </li>
        <li>
          <NavLink to="attractions">Attractions</NavLink>
        </li>
        <li>
          <NavLink to="schedule">Schedule</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PlannerNav;
