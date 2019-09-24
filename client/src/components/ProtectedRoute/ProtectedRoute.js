import React, { useContext } from "react";
import { Route, Redirect } from "react-router";
import UserContext from "../../contexts/UserContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={props => {
        // if (localStorage.getItem("token")) {
        if (user) {
          return <Component {...props} />;
        }
        return <Redirect to="/login" />;
      }}
    />
  );
};

export default ProtectedRoute;
