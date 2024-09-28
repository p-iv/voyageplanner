import { useState } from "react";
import styles from "./Login.module.scss";
import AppNav from "../components/AppNav";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/UI/Spinner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuth();

  const user = {
    email: email,
    password: password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login(user);
    setEmail("");
    setPassword("");
  };
  return (
    <main className={styles.login}>
      <AppNav />
      {isLoading ? (
        <Spinner />
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>Log In</h1>

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
          <button type="submit">Log In</button>

          <p>
            Don't have an account?{" "}
            <Link to="/signup">
              <b>Sign Up</b>
            </Link>
          </p>
        </form>
      )}
    </main>
  );
}
