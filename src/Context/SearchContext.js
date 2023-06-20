import { createContext, useReducer } from "react";
import searchReducer from "./SearchReducer";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const initalState = {
    movies: [],
    loading: false,
    input: "",
    maxPages: 1,
    page: 1,
  };

  const [state, dispatch] = useReducer(searchReducer, initalState);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
