import { getType } from "typesafe-actions";
import { CHECK_LOGGED_IN, LOGIN, LOGOUT } from "../actions";
import { IAuthState, IAuthReducer, IAction } from "../../interfaces";

const initialState: IAuthState = {
  loggedIn: true,
  isLoggingIn: false,
  username: "",
};

export const AuthReducer: IAuthReducer = (
  state = initialState,
  action: IAction
) => {
  const { type, payload } = action;
  const newState = () => {
    switch (type) {
      case getType(LOGIN.request):
      case getType(CHECK_LOGGED_IN.request):
        return { isLoggingIn: false };
      case getType(LOGIN.success):
        const { access_token } = payload;

        window.localStorage.setItem("token", access_token);
        return { isLoggingIn: false, loggedIn: true };
      case getType(LOGIN.failure):
      case getType(CHECK_LOGGED_IN.failure):
        return { isLoggingIn: false, loggedIn: false };
      case getType(CHECK_LOGGED_IN.success):
        return { isLoggingIn: false, loggedIn: true };
      case getType(LOGOUT):
        window.localStorage.removeItem("token");
        return { loggedIn: false };
      case getType(CHECK_LOGGED_IN.success):
        return { isLoggingIn: false, loggedIn: true };
      default:
        return state;
    }
  };
  return {
    ...state,
    ...newState(),
  };
};
