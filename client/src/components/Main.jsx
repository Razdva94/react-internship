import React from "react";
import HabitTracker from "./HabitTracker";
import PageLayout from "./PageLayout";

function Main({ setAuthenticated }) {

  return (

    <>
      <PageLayout setAuthenticated={setAuthenticated} />
      <HabitTracker />
    </>


  );
}

export default Main;
