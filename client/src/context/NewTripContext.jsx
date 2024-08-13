import { createContext, useContext, useReducer } from "react";

const NewTripContext = createContext();

const initialState = {
  activeDestinationForm: false,
  destination: "",
  destinations: [],
  attractions: [],
  trips: [],
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
        destinations: [...state.destinations, action.payload],
      };
    case "set/destinations":
      return {
        ...state,
        destinations: action.payload,
      };
    case "set/activeDestinationForm":
      return {
        ...state,
        activeDestinationForm: action.payload,
      };
    case "delete/destination":
      return {
        ...state,
        destinations: state.destinations.filter(
          (destination) => destination.id !== action.payload
        ),
      };
    case "add/trip":
      return {
        ...state,
        trips: [...state.trips, action.payload],
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
    { destination, attractions, trips, destinations, activeDestinationForm },
    dispatch,
  ] = useReducer(reducer, initialState);
  console.log(trips);
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
