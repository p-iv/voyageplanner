import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const initialState = {
  user: null,
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "set/user":
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };

    case "set/loading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
  }
}

function AuthProvider({ children }) {
  const [{ isLoading }, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const signUp = async (user) => {
    try {
      const res = await fetch("http://localhost:3001/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", true);
        navigate("/app");
      }
    } catch (err) {
      console.error(err);
      dispatch({ type: "rejected", payload: "Failed to signup" });
    }
  };

  const login = async (user) => {
    dispatch({ type: "set/loading", payload: true });
    try {
      const res = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (res.ok) {
        const data = await res.json();

        dispatch({ type: "set/loading", payload: false });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", true);

        navigate("/app");
      }
    } catch (err) {
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch({ type: "set/loading", payload: false });
    dispatch({ type: "set/error", payload: "" });
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ signUp, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside the AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
