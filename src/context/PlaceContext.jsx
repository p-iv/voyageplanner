import { createContext, useContext, useEffect, useReducer } from "react";

const API_KEY = "AIzaSyAUgy97d-8V-p70KKlbyVR3MFQxUnqoGGI";

const PlaceContext = createContext();

const initialState = {
  places: [],
  currentPlace: {},
  isLoading: false,
  location: {},
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
    case "location/got":
      return {
        ...state,
        location: action.payload,
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
  const [{ places, currentPlace, isLoading, location }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(
    function () {
      async function fetchPlaces() {
        dispatch({ type: "loading" });
        try {
          const res = await fetch(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat}%2C${location.lng}&radius=4000&type=restaurant&key=${API_KEY}`
          );
          const data = await res.json();
          dispatch({ type: "places/loaded", payload: data.results });
        } catch {
          dispatch({ type: "rejected", payload: "Something went wrong" });
        }
      }
      fetchPlaces();
    },
    [location]
  );

  function getLocation(location) {
    dispatch({ type: "location/got", payload: location });
  }

  return (
    <PlaceContext.Provider value={{ getLocation, places }}>
      {children}
    </PlaceContext.Provider>
  );
}

function usePlace() {
  return useContext(PlaceContext);
}

export { PlaceProvider, usePlace };
