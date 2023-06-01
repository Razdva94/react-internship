import { createSlice } from "@reduxjs/toolkit";

const signInSlice = createSlice({
  name: "signIn",
  initialState: {
    signIn: false,
    authProfile: false,
  },
  reducers: {
    setAuthProfile(state){
    state.authProfile = true
    },
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

export const { setSignIn, outSignIn, setAuthProfile } = signInSlice.actions;
export default signInSlice.reducer;
