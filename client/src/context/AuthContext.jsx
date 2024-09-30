import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useTrip } from "./NewTripContext";

const AuthContext = createContext();

const initialState = {
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "set/loading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "logout":
      return {
        ...state,
        isLoading: false,
        error: "",
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
  const { fetchTrips } = useTrip();
  const navigate = useNavigate();

  const signUp = async (user) => {
    try {
      const res = await fetch(
        "https://voyageplanner-server.vercel.app/api/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const data = res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", true);

        fetchTrips();

        navigate("/app");
      }
    } catch (err) {
      console.error(err);
      dispatch({ type: "rejected", payload: "Failed to signup" });
    }
  };

  const login = async (user) => {
    dispatch({ type: "set/loading", payload: true });
    if (!user.email || !user.password) {
      dispatch({ type: "rejected", payload: "All fields are required" });
      return;
    }
    try {
      const res = await fetch(
        "https://voyageplanner-server.vercel.app/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      if (res.ok) {
        const data = await res.json();

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", true);
        dispatch({ type: "set/loading", payload: false });

        fetchTrips();

        navigate("/app");
      } else {
        dispatch({ type: "rejected", payload: "Invalid email or password" });
        dispatch({ type: "set/loading", payload: false });

        return;
      }
    } catch (err) {
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch({ type: "logout" });
    navigate("/login");
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
