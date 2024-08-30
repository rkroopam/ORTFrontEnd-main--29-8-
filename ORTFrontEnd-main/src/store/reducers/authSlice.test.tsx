// src/store/reducers/authSlice.test.ts
import authReducer, { login, logout, setUserToken} from "./authSlice";

console.error = jest.fn();
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

// Define a simplified version of RootState for the test
interface RootState {
  auth: AuthState;
}

describe("authSlice", () => {
  const initialState: AuthState = {
    user: null,
    token: null,
  };

  it("should return the initial state", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle login", () => {
    const user: User = {
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      id: "1",
      userType: "student",
    };

    const actual = authReducer(initialState, login(user));
    expect(actual.user).toEqual(user);
    expect(actual.token).toBeNull();
  });

  it("should handle logout", () => {
    const loggedInState: AuthState = {
      user: {
        firstName: "John",
        lastName: "Doe",
        username: "johndoe",
        id: "1",
        userType: "student",
      },
      token: "some-token",
    };

    const actual = authReducer(loggedInState, logout());
    expect(actual.user).toBeNull();
    expect(actual.token).toEqual("some-token");
  });

  it("should handle setUserToken", () => {
    const token = "new-token";
    const actual = authReducer(initialState, setUserToken(token));
    expect(actual.token).toEqual(token);
    expect(actual.user).toBeNull();
  });

  it("should select the user", () => {
   

    // const selectedUser = selectUser(state);
    // expect(selectedUser).toEqual(state.auth.user);
  });
});
