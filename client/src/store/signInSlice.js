import { createSlice } from "@reduxjs/toolkit";

const signInSlice = createSlice({
  name: "signIn",
  initialState: {
    signIn: false,
  },
  reducers: {
    setSignIn(state, actions) {
      state.signIn = true;
      console.log(state)
      console.log(actions)
    },
    outSignIn(state, actions) {
      state.signIn = false;
      console.log(state)
      console.log(actions)
    },
  },
});

export const { setSignIn, outSignIn } = signInSlice.actions;
export default signInSlice.reducer;
