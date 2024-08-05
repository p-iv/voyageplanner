import { createContext, useContext, useEffect, useReducer } from "react";

const DestinationContext = createContext();

const initialState = {
  autocomplete: [],
  query: "",
  isLoading: false,
  error: "",
  currentDestination: {},
  lat: 52.2296756,
  lng: 21.0122287,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "autocomplete/loaded":
      return {
        ...state,
        isLoading: false,
        autocomplete: action.payload,
      };

    case "query/entered":
      return {
        ...state,
        query: action.payload,
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "destination/loaded":
      return {
        ...state,
        isLoading: false,
        currentDestination: action.payload,
      };

    case "lat/loaded":
      return {
        ...state,
        lat: action.payload,
      };

    case "lng/loaded":
      return {
        ...state,
        lng: action.payload,
      };
  }
}

function DestinationProvider({ children }) {
  const [
    { autocomplete, isLoading, query, currentDestination, lat, lng },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(
    function () {
      async function fetchAutocomplete() {
        dispatch({ type: "loading" });
        try {
          const res = await fetch(
            `https://voyageplanner-server.vercel.app/api/googleMapsApi/destinations?input=${query}`
          );
          const data = await res.json();
          dispatch({ type: "autocomplete/loaded", payload: data.predictions });
        } catch {
          dispatch({
            type: "rejected",
            payload: "There was an error loading data...",
          });
        }
      }
      fetchAutocomplete();
    },
    [query]
  );

  async function getDestination(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(
        `https://voyageplanner-server.vercel.app/api/googleMapsApi/destination?id=${id}`
      );
      const data = await res.json();
      dispatch({ type: "destination/loaded", payload: data.result });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading data...",
      });
    }
  }

  async function getLocation(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(
        `https://voyageplanner-server.vercel.app/api/googleMapsApi/location?id=${id}`
      );
      const data = await res.json();
      dispatch({
        type: "lat/loaded",
        payload: data.result.geometry.location.lat,
      });
      dispatch({
        type: "lng/loaded",
        payload: data.result.geometry.location.lng,
      });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading data...",
      });
    }
  }

  return (
    <DestinationContext.Provider
      value={{
        autocomplete,
        isLoading,
        dispatch,
        getDestination,
        currentDestination,
        getLocation,

        lat,
        lng,
      }}
    >
      {children}
    </DestinationContext.Provider>
  );
}

function useDestination() {
  const context = useContext(DestinationContext);
  if (context === undefined)
    throw new Error("DestinationContext was used outside the CitiesProvider");
  return context;
}

export { DestinationProvider, useDestination };
