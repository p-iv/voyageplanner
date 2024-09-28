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
    case "delete/trip":
      return {
        ...state,
        trips: state.trips.filter((trip) => trip._id !== action.payload),
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

  useEffect(() => {
    const fetchTrips = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:3001/api/trips", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        dispatch({ type: "set/trips", payload: data.data.trips });
      } catch (err) {
        dispatch({ type: "rejected", payload: "Failed to fetch trips" });
      }
    };
    fetchTrips();
  }, []);

  const createTrip = async (trip) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3001/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(trip),
      });
      const data = await res.json();
      dispatch({ type: "set/trips", payload: [...trips, data.data.trip] });
    } catch (err) {
      console.error(err);
      dispatch({ type: "rejected", payload: "Failed to create trip" });
    }
  };

  const deleteTrip = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:3001/api/trips/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        dispatch({ type: "delete/trip", payload: id });
      }
    } catch (err) {
      console.error(err);
      dispatch({ type: "rejected", payload: "Failed to delete trip" });
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
        deleteTrip,
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
