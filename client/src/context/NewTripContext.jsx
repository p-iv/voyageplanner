import { createContext, useContext, useEffect, useReducer } from "react";

const NewTripContext = createContext();

const initialState = {
  activeDestinationForm: false,
  destination: "",
  destinations: [],
  attractions: [],
  selectedTrip: null,
  trips: [],
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
    case "set/trips":
      return {
        ...state,
        trips: action.payload,
      };

    case "delete/destination":
      return {
        ...state,
        destinations: state.destinations.filter(
          (destination) => destination.id !== action.payload
        ),
      };

    case "set/selectedTrip":
      return {
        ...state,
        selectedTrip: action.payload,
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
    {
      destination,
      attractions,
      destinations,
      activeDestinationForm,
      selectedTrip,
      trips,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  console.log(attractions[1]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch(
          "https://voyageplanner-server.vercel.app/api/trips"
        );
        const data = await res.json();
        dispatch({ type: "set/trips", payload: data.data.trips });
      } catch (err) {
        console.error(err);
        dispatch({ type: "rejected", payload: "Failed to fetch trips" });
      }
    };
    fetchTrips();
  }, []);

  const createTrip = async (trip) => {
    try {
      const res = await fetch(
        "https://voyageplanner-server.vercel.app/api/trips",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(trip),
        }
      );
      const data = await res.json();
      dispatch({ type: "set/trips", payload: [...trips, data.data.trip] });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <NewTripContext.Provider
      value={{
        dispatch,
        destinations,
        attractions,
        destination,
        activeDestinationForm,
        selectedTrip,
        createTrip,
        trips,
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
