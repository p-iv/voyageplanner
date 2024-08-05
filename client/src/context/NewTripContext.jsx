import { createContext, useContext, useReducer } from "react";

const NewTripContext = createContext();

const initialState = {
  activeDestinationForm: false,
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
    case "set/activeDestinationForm":
      return {
        ...state,
        activeDestinationForm: action.payload,
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
  const [
    { destination, attractions, date, destinations, activeDestinationForm },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <NewTripContext.Provider
      value={{
        dispatch,
        destinations,
        attractions,
        destination,
        activeDestinationForm,
      }}
    >
      {children}
    </NewTripContext.Provider>
  );
}

function useTrip() {
  return useContext(NewTripContext);
}

export { NewTripProvider, useTrip };
