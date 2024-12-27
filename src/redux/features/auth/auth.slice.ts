import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store";
import { TTokenUser } from "../../../types";

export type TAuthState = {
  token: null | string;
  user: null | TTokenUser;
};
const authInitialState: TAuthState = {
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    setUser(state, action: PayloadAction<TAuthState>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout(state) {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
