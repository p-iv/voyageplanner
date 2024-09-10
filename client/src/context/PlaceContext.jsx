import { createContext, useContext, useEffect, useReducer } from "react";

const PlaceContext = createContext();

const initialState = {
  places: [],
  currentPlace: {},
  isLoading: false,
  location: {},
  filter: "",
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "places/loaded":
      return {
        ...state,
        places: action.payload,
        isLoading: false,
      };
    case "place/loaded":
      return {
        ...state,
        currentPlace: action.payload,
        isLoading: false,
      };
    case "location/got":
      return {
        ...state,
        location: action.payload,
      };
    case "filter/changed":
      return {
        ...state,
        filter: action.payload,
      };
    case "rejected":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}

function PlaceProvider({ children }) {
  const [{ places, currentPlace, isLoading, location, filter }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(() => {
    const fetchPlaces = async () => {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(
          `https://voyageplanner-server.vercel.app/api/googleMapsApi/places?lat=${location.lat}&lng=${location.lng}&type=${filter}`
        );
        const data = await res.json();
        dispatch({ type: "places/loaded", payload: data.results });
      } catch {
        dispatch({ type: "rejected", payload: "Something went wrong" });
      }
    };
    fetchPlaces();
  }, [location, filter]);

  const getLocation = (location) => {
    dispatch({ type: "location/got", payload: location });
  };

  const getPlace = async (id) => {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(
        `https://voyageplanner-server.vercel.app/api/googleMapsApi/place?id=${id}`
      );
      const data = await res.json();
      dispatch({ type: "place/loaded", payload: data.result });
    } catch {
      dispatch({ type: "rejected", payload: "Something went wrong" });
    }
  };

  return (
    <PlaceContext.Provider
      value={{
        getLocation,
        places,
        getPlace,
        isLoading,
        currentPlace,
        dispatch,
      }}
    >
      {children}
    </PlaceContext.Provider>
  );
}

function usePlace() {
  return useContext(PlaceContext);
}

export { PlaceProvider, usePlace };
