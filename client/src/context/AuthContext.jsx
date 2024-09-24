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
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const signup = async (user) => {
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

      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        dispatch({ type: "set/user", payload: { token: data.token } });
        navigate("/app");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      dispatch({ type: "error", payload: err.message });
    }
  };

  const login = async (user) => {
    dispatch({ type: "set/loading", payload: true });
    try {
      const response = await fetch(
        "https://voyageplanner-server.vercel.app/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        dispatch({ type: "set/user", payload: { token: data.token } });
        navigate("/app");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error", error);
    } finally {
      dispatch({ type: "set/loading", payload: false });
    }
  };

  return (
    <AuthContext.Provider value={{ signup, login }}>
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
