import { createContext, useReducer } from "react";

export const TransactionContext = createContext();

const initialValues = {
  transaction: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "TRANSACTION":
      return {
        ...state,
        transaction: payload,
      };
    case "TF_SUCCESS":
      return {
        ...state,
        transaction: null,
      };

    default:
      throw new Error();
  }
};

export const TransactionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  return (
    <TransactionContext.Provider value={[state, dispatch]}>
      {children}
    </TransactionContext.Provider>
  );
};
