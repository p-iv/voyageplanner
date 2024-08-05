import { createContext, useContext, useEffect, useReducer } from "react";

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
            `https://voyageplanner-server.vercel.app/api/googleMapsApi/places?lat=${location.lat}&lng=${location.lng}`
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

  async function getPlace(id) {
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
  }

  return (
    <PlaceContext.Provider
      value={{ getLocation, places, getPlace, isLoading, currentPlace }}
    >
      {children}
    </PlaceContext.Provider>
  );
}

function usePlace() {
  return useContext(PlaceContext);
}

export { PlaceProvider, usePlace };
