import { useState } from "react";
import styles from "./SignUp.module.scss";
import AppNav from "../components/AppNav";
import { Link } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  return (
    <main className={styles.login}>
      <AppNav />
      <form className={styles.form}>
        <h1>Sign Up</h1>

        <input
          type="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={confirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />
        <button>Sign Up</button>

        <p>
          Do you have an account?{" "}
          <Link to="/login">
            <b>Log in</b>
          </Link>
        </p>
      </form>
    </main>
  );
}

export default SignUp;
