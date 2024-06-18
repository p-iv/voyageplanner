import { createContext, useContext, useEffect, useReducer } from "react";

const API_KEY = "AIzaSyCOxyyTfRJfz2oOz-DLbzwLWFGMYjnuboE";

const AutocomleteContext = createContext();

const initialState = {
  autocomplete: [],
  query: "",
  isLoading: false,
  error: "",
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
  }
}

function AutocompleteProvider({ children }) {
  const [{ autocomplete, isLoading, query }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(
    function () {
      async function fetchAutocomplete() {
        dispatch({ type: "loading" });
        try {
          const res = await fetch(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&types=(cities)&key=${API_KEY}`
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

  return (
    <AutocomleteContext.Provider
      value={{
        autocomplete,
        isLoading,
        dispatch,
      }}
    >
      {children}
    </AutocomleteContext.Provider>
  );
}

function useAutoComplete() {
  const context = useContext(AutocomleteContext);
  if (context === undefined)
    throw new Error("AutocomleteContext was used outside the CitiesProvider");
  return context;
}

export { AutocompleteProvider, useAutoComplete };
