import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "set/user":
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
  }
}

function AuthProvider({ children }) {
  const [{}, dispatch] = useReducer(reducer, initialState);
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside the AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
