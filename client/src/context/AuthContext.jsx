import { createContext, useContext, useReducer } from "react";

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

  const signUp = async (user) => {
    try {
      const res = await fetch("127.0.0.1:3001/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = res.json();
      console.log(data.result);
    } catch (err) {
      console.error(err);
      dispatch({ type: "rejected", payload: "Failed to signup" });
    }
  };

  return (
    <AuthContext.Provider value={{ signUp }}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside the AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
