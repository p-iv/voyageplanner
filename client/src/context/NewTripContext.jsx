import { createContext, useContext, useReducer } from "react";

const NewTripContext = createContext();

const initialState = {
  destination: "",
  attractions: [],
  date: "",
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
    default:
      return state;
  }
}

function NewTripProvider({ children }) {
  const [{ destination, attractions, date }, dispatch] = useReducer(
    reducer,
    initialState
  );
  console.log(destination);
  console.log(attractions);
  return (
    <NewTripContext.Provider value={{ dispatch, destination, attractions }}>
      {children}
    </NewTripContext.Provider>
  );
}

function useTrip() {
  return useContext(NewTripContext);
}

export { NewTripProvider, useTrip };
