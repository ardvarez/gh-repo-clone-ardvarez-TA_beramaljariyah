import { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialValues = {
  loginStatus: false,
  user: null,
};

const reducer = (state, action) => {
  //action params
  const { type, payload } = action;

  switch (type) {
    case "AUTH_SUCCESS":
    case "REGISTER":
    case "LOGIN":
      //set Token to local storage
      localStorage.setItem("token", payload.id);

      return {
        ...state,
        loginStatus: true,
        user: payload,
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        loginStatus: false,
      };

    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
