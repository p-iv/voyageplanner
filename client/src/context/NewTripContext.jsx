import { createContext, useContext, useReducer } from "react";

const NewTripContext = createContext();

const initialState = {
  destination: "",
  destinations: [],
  attractions: [],
  date: "",
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "set/destination":
      return {
        ...state,
        destination: action.payload,
      };
    case "set/attractions":
      return {
        ...state,
        attractions: action.payload,
      };
    case "set/date":
      return {
        ...state,
        date: action.payload,
      };
    case "add/Destinations":
      return {
        ...state,
        destinations: action.payload,
      };

    case "rejected":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}

function NewTripProvider({ children }) {
  const [{ destination, attractions, date, destinations }, dispatch] =
    useReducer(reducer, initialState);
  console.log(destinations);
  return (
    <NewTripContext.Provider
      value={{ dispatch, destination, attractions, destinations }}
    >
      {children}
    </NewTripContext.Provider>
  );
}

function useTrip() {
  return useContext(NewTripContext);
}

export { NewTripProvider, useTrip };
