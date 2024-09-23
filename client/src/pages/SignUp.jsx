import { useState } from "react";
import styles from "./SignUp.module.scss";
import AppNav from "../components/AppNav";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const { signup } = useAuth();

  const newUser = {
    name: name,
    email: email,
    password: password,
    confirmPassword: confirmedPassword,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmedPassword) {
      signup(newUser);
    } else {
      alert("Passwords do not match");
    }
    setName("");
    setEmail("");
    setPassword("");
    setConfirmedPassword("");
  };

  return (
    <main className={styles.login}>
      <AppNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Sign Up</h1>

        <input
          required
          type="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          minLength="8"
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          minLength="8"
          required
          type="password"
          placeholder="Confirm password"
          value={confirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>

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
