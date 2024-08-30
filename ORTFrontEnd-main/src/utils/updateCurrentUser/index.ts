import { Dispatch } from "@reduxjs/toolkit";
import { login, logout, setUserToken } from "../../store/reducers/authSlice";
import { setCurrentUser } from "../../store/reducers/userSlice";

// utils/auth.ts
export const setUserData = (data: any) => {
  localStorage.setItem("USER", JSON.stringify(data));
};

export const removeUserData = (dispatch: Dispatch) => {
  localStorage.removeItem("USER");
  localStorage.removeItem("token");
  dispatch(logout());
};

export const setToken = (token: string, dispatch: Dispatch) => {
  localStorage.setItem("perentToken", token);
  console.log("inside settoken",token)
  dispatch(setUserToken(token));
};

export const setStudentToken = (token: string, dispatch: Dispatch) => {
  localStorage.setItem("studentToken", token);
  dispatch(setUserToken(token));
};

export const dispatchUser = (dispatch: Dispatch, userData: any) => {
  dispatch(setCurrentUser(userData));
  dispatch(login(userData));
};

export const getUserDetails = () => {
  const userData = localStorage.getItem("USER");
  if (userData) {
    const parsedUserData = JSON.parse(userData);
    return parsedUserData;
  } else {
    return "";
  }
};

export const checkUserDetails = (dispatch: Dispatch): any | null => {
  const userDataString = localStorage.getItem("USER");
  const token = localStorage.getItem("token");

  if (token) {
    dispatch(setUserToken(token));
  }

  if (userDataString) {
    try {
      const userData: any = JSON.parse(userDataString);
      dispatchUser(dispatch, userData);
      return userData;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  }

  return null;
};
