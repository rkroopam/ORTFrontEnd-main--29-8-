// src/store/reducers/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface User {
  firstName: string;
  lastName: string;
  username: string;
  id: string;
  userType: "superAdmin" | "admin" | "teacher" | "student";
}

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setUserToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { login, logout, setUserToken } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
