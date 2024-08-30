import { Link } from "react-router-dom";
import styles from "./Logo.module.scss";

function Logo() {
  return (
    <Link to="/">
      {" "}
      <img src="/logo-img.png" alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
