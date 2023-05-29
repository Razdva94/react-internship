import { createSlice } from "@reduxjs/toolkit";

const signInSlice = createSlice({
  name: "signIn",
  initialState: {
    signIn: false,
  },
  reducers: {
    toggleSignIn(state, actions) {
      state.signIn = true;
      console.log(state)
      console.log(actions)
    },
  },
});

export const { toggleSignIn} = signInSlice.actions;
export default signInSlice.reducer;
