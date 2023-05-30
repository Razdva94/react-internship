import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ProtectedRouteElement from "./ProtectedRouteElement";
import { useDispatch, useSelector } from "react-redux";
import ResetEmail from "./ResetEmail";
import SendResetMessage from "./SendResetMessage";
import { useAuth } from "../hooks/auth.hook";
import Main from "./Main";

function App() {
  const navigate = useNavigate();
  const { token, login, logout, userId } = useAuth();
  const signInState = useSelector((state) => state.slide.signIn);
  console.log(signInState);
  const [authenticated, setAuthenticated ] = React.useState(false)
  React.useEffect(() => {
  setAuthenticated (token)
  }, [token])
  console.log(authenticated)
  
  React.useEffect(() => {
    if (authenticated) {
      navigate("/");
    }
  }, [authenticated, navigate, token]);
  return (
    <Routes>
      <Route path="/send-reset-message" element={<SendResetMessage />} />
      <Route path="/reset" element={<ResetEmail />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route
        path="/"
        element={
          <ProtectedRouteElement
            component={<Main setAuthenticated={setAuthenticated }/>}
            loggedIn={signInState || authenticated}
          />
        }
      />
    </Routes>
  );
}

export default App;
