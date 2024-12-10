import { createSlice } from "@reduxjs/toolkit";
const initialAuthState = { isAuthencated: false };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthencated = true;
    },
    logout(state) {
      state.isAuthencated = false;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
