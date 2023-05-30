import React from "react";
import Button from "@mui/material/Button";
import { useAuth } from "../hooks/auth.hook";
import { useDispatch, useSelector } from "react-redux";
import { outSignIn } from "../store/signInSlice";

function Main({setAuthenticated}) {
  const dispatch = useDispatch();
  const signInState = useSelector((state) => state.slide.signIn);
  const { token, login, logout, userId } = useAuth();

  const handleLogout = () => {
    logout();
    dispatch(outSignIn());
    localStorage.clear();
    setAuthenticated (false);
  };
  console.log(signInState);
  console.log(token);
  return (
    <div>
      <h1>Main</h1>
      <Button variant="contained" onClick={handleLogout}>
        Выход
      </Button>
    </div>
  );
}

export default Main;
