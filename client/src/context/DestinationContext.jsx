import { createContext, useContext, useEffect, useReducer } from "react";

const DestinationContext = createContext();

const initialState = {
  autocomplete: [],
  query: "",
  isLoading: false,
  error: "",
  currentDestination: {},
  mapLocation: {},
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

    case "location/loaded":
      return {
        ...state,
        mapLocation: action.payload,
      };
  }
}

function DestinationProvider({ children }) {
  const [
    { autocomplete, isLoading, query, currentDestination, mapLocation },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(
    function () {
      async function fetchAutocomplete() {
        dispatch({ type: "loading" });
        try {
          const res = await fetch(
            `http://localhost:3001/destinations?input=${query}`
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
    try {
      const res = await fetch(`http://localhost:3001/destination?id=${id}`);
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
      const res = await fetch(`http://localhost:3001/location?id=${id}`);
      const data = await res.json();
      dispatch({
        type: "location/loaded",
        payload: data.result.geometry.location,
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
        mapLocation,
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
