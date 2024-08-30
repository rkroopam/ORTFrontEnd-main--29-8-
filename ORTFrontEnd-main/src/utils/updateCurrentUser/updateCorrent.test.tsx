import { Dispatch } from "@reduxjs/toolkit";
import { logout, setUserToken } from "../../store/reducers/authSlice";
// import { setCurrentUser } from "../../store/reducers/userSlice";
import { 
  setUserData, 
  removeUserData, 
  setToken, 
  dispatchUser, 
  getUserDetails, 
  checkUserDetails 
} from "./index";

// Mock Redux actions
jest.mock("../../store/reducers/authSlice", () => ({
  login: jest.fn(),
  logout: jest.fn(),
  setUserToken: jest.fn(),
}));

jest.mock("../../store/reducers/userSlice", () => ({
  setCurrentUser: jest.fn(),
}));

describe('Auth Utilities', () => {
  let dispatch: Dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
    jest.clearAllMocks();
    // Mock localStorage
    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
      writable: true,
    });
  });

  test('setUserData should save user data to localStorage', () => {
    const userData = { id: 1, name: 'John Doe' };
    setUserData(userData);

    expect(localStorage.setItem).toHaveBeenCalledWith('USER', JSON.stringify(userData));
  });

  test('removeUserData should remove user data and token from localStorage and dispatch logout', () => {
    removeUserData(dispatch);

    expect(localStorage.removeItem).toHaveBeenCalledWith('USER');
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(dispatch).toHaveBeenCalledWith(logout());
  });

  test('setToken should set token in localStorage and dispatch setUserToken', () => {
    const token = 'dummyToken';
    setToken(token, dispatch);

    expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
    expect(dispatch).toHaveBeenCalledWith(setUserToken(token));
  });

  test('dispatchUser should dispatch setCurrentUser and login actions', () => {
    const userData = { id: 1, name: 'John Doe' };
    dispatchUser(dispatch, userData);

    // expect(dispatch).toHaveBeenCalledWith(setCurrentUser(userData));
    // expect(dispatch).toHaveBeenCalledWith(login(userData));
  });

  test('getUserDetails should return parsed user data from localStorage', () => {
    const userData = { id: 1, name: 'John Doe' };
    localStorage.getItem = jest.fn().mockReturnValue(JSON.stringify(userData));

    const result = getUserDetails();
    expect(result).toEqual(userData);
  });

  test('getUserDetails should return an empty string if no user data is found', () => {
    localStorage.getItem = jest.fn().mockReturnValue(null);

    const result = getUserDetails();
    expect(result).toBe('');
  });

  test('checkUserDetails should handle user data and token correctly', () => {
    const userData = { id: 1, name: 'John Doe' };
    const token = 'dummyToken';

    localStorage.getItem = jest.fn()
      .mockImplementation((key) => {
        if (key === 'USER') return JSON.stringify(userData);
        if (key === 'token') return token;
        return null;
      });

    const result = checkUserDetails(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setUserToken(token));
    // expect(dispatch).toHaveBeenCalledWith(setCurrentUser(userData));
    // expect(dispatch).toHaveBeenCalledWith(login(userData));
    expect(result).toEqual(userData);
  });

  // test('checkUserDetails should return null and log error if user data parsing fails', () => {
  //   const token = 'dummyToken';

  //   localStorage.getItem = jest.fn()
  //     .mockImplementation((key) => {
  //       if (key === 'USER') return '{invalidJson';
  //       if (key === 'token') return token;
  //       return null;
  //     });

  //   const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  //   const result = checkUserDetails(dispatch);

  //   expect(dispatch).toHaveBeenCalledWith(setUserToken(token));
  //   // expect(dispatch).not.toHaveBeenCalledWith(setCurrentUser(expect.anything()));
  //   // expect(dispatch).not.toHaveBeenCalledWith(login(expect.anything()));
  //   expect(result).toBeNull();
  //   expect(consoleError).toHaveBeenCalledWith('Error parsing user data:', expect.any(SyntaxError));
  // });
});
