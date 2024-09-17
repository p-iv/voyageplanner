import { useState } from "react";
import styles from "./Login.module.scss";
import AppNav from "../components/AppNav";
import { Link } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className={styles.login}>
      <AppNav />
      <form className={styles.form}>
        <h1>Log In</h1>

        <input
          type="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Log In</button>

        <p>
          Don't have an account?{" "}
          <Link to="/signup">
            <b>Sign Up</b>
          </Link>
        </p>
      </form>
    </main>
  );
}
