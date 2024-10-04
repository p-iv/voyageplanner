import { useTrip } from "../context/NewTripContext";
import styles from "./DestinationNav.module.scss";
import { NavLink } from "react-router-dom";

function DestinationNav() {
  const { dispatch } = useTrip();

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink
            to="/app/destination"
            onClick={() => {
              dispatch({ type: "clear/data" });
            }}
          >
            Destination
          </NavLink>
        </li>
        <li>
          <NavLink to="/app/attractions">Attractions</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default DestinationNav;
