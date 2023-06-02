import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ProtectedRouteElement from "./ProtectedRouteElement";
import { useDispatch, useSelector } from "react-redux";
import ResetPassword from "./ResetPassword";
import { useAuth } from "../hooks/auth.hook";
import Main from "./Main";
import SendResetMessage from "./SendResetMessage";
import ProfileAndAvatar from "./ProfileAndAvatar";
import PageLayout from "./PageLayout";


function App() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const signInState = useSelector((state) => state.slide.signIn);
  const authProfileState = useSelector((state) => state.slide.authProfile);

  const [authenticated, setAuthenticated] = React.useState(false);
  React.useEffect(() => {
    setAuthenticated(token);
  }, [token]);

  React.useEffect(() => {
    console.log(localStorage.getItem("authProfileState"));
    if (authenticated && localStorage.getItem("authProfileState")) {
      navigate("/profile");
    }
    if (authenticated && !localStorage.getItem("authProfileState")) {
      navigate("/");
    }
  }, [authenticated, navigate, authProfileState]);
  return (
    <Routes>
      <Route element={<PageLayout setAuthenticated={setAuthenticated} />}>

        <Route
          path="/"
          element={
            <ProtectedRouteElement
              component={<Main setAuthenticated={setAuthenticated} />}
              loggedIn={signInState || authenticated}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRouteElement

              component={<ProfileAndAvatar />
              }
              loggedIn={signInState || authenticated}
            />
          }
        />
      </Route>
      <Route path="/send-reset-message" element={<SendResetMessage />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />

    </Routes>
  );
}

export default App;
