// src/store/reducers/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface User {
  id: string;
  username: string;
  email: string;
  userType: "superAdmin" | "admin" | "teacher" | "student";
}

interface UserState {
  users: User[];
  currentUser: User | null;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  },
});

export const {
  setCurrentUser,
  clearCurrentUser,
  addUser,
  removeUser,
  updateUser,
} = userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectUsers = (state: RootState) => state.user.users;

export default userSlice.reducer;
