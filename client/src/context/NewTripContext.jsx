import { createContext, useContext, useReducer } from "react";

const NewTripContext = createContext();

const initialState = {
  destination: "",
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
  const [{ destination, attractions, date }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const handleSubmitTrip = async () => {
    const tripData = {
      destination,
      attractions,
    };

    try {
      const res = await fetch("http://localhost:3001/trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tripData),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
      dispatch({
        type: "rejected",
        payload: "There was an error of posting data",
      });
    }
  };

  return (
    <NewTripContext.Provider
      value={{ dispatch, destination, attractions, handleSubmitTrip }}
    >
      {children}
    </NewTripContext.Provider>
  );
}

function useTrip() {
  return useContext(NewTripContext);
}

export { NewTripProvider, useTrip };
