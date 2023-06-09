import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ component, loggedIn }) => {
  return loggedIn ? (
    component
  ) : (
    <Navigate to="/sign-in" replace />
  );
};

export default ProtectedRouteElement;