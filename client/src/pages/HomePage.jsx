import { Link } from "react-router-dom";
import AppNav from "../components/AppNav";
import styles from "./HomePage.module.scss";
import { useAuth } from "../context/AuthContext";

function HomePage() {
  const user = localStorage.getItem("user");
  return (
    <main className={styles.homepage}>
      <AppNav />
      <section>
        <h1> VoyagePlanner Will Plan Your Next Adventure</h1>

        <h2>
          Plan your perfect trip effortlessly with our travel planning app.
          Discover destinations, add attractions, create personalized
          itineraries, and manage your travel schedule all in one place.
        </h2>

        <Link to={user ? "/app" : "/login"} className="cta">
          Plan Your Trip Now
        </Link>
      </section>
    </main>
  );
}

export default HomePage;
