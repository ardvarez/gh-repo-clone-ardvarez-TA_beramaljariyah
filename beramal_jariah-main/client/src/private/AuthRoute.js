import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

const AuthRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.loginStatus ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default AuthRoute;
