import { createContext, useReducer } from "react";

export const SearchContext = createContext();

const initialValues = {
  keyword: "",
  search: [],
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SEARCH":
      return {
        ...state,
        keyword: payload.keyword,
        search: payload.search,
      };

    default:
      throw new Error();
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  return (
    <SearchContext.Provider value={[state, dispatch]}>
      {children}
    </SearchContext.Provider>
  );
};
