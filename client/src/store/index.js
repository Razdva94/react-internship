import { configureStore } from "@reduxjs/toolkit";
import signInReducer from "./signInSlice";

export default configureStore({
  reducer: {
    slide: signInReducer,
  },
});
