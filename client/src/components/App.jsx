import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ProtectedRouteElement from "./ProtectedRouteElement";
import { useDispatch, useSelector } from "react-redux";

function App() {

  const signInState = useSelector((state) => state.slide.signIn);
  console.log(signInState)

  return (
    <Routes>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route
        path="/"
        element={
          <ProtectedRouteElement component={<div>App</div>} loggedIn={signInState} />
        }
      />
    </Routes>
  );
}

export default App;
