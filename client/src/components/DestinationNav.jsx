import styles from "./DestinationNav.module.scss";
import { NavLink } from "react-router-dom";

function DestinationNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="/app/destination">Destination</NavLink>
        </li>
        <li>
          <NavLink to="/app/attractions">Attractions</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default DestinationNav;
