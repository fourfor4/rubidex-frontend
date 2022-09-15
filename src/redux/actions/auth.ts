import { Navigate } from "react-router";
import { LOGIN, LOGOUT, CHECK_LOGGED_IN } from "./index";
import Api from "../../helpers/axios";
import { AnyAction } from "redux";

type LoginProps = {
  username: string;
  password: string;
};

export const doLogin = (payload: LoginProps) => async (dispatch: any) => {
  const { username, password } = payload;

  dispatch(LOGIN.request(payload));
  try {
    const { data } = await Api.login(username, password);
    console.log(data);
    // Navigate({ to: '/dashboard' });
    dispatch(LOGIN.success(data));
  } catch (err: any) {
    dispatch(LOGIN.failure(err));
  }
};

export const doLogout = () => async (dispatch: any) => {
  try {
    await Api.logout();
    dispatch(LOGOUT());
  } catch (err) {
    dispatch(LOGOUT());
  }
};

export const checkLoggedIn = () => async (dispatch: any) => {
  dispatch(CHECK_LOGGED_IN.request(null));
  try {
    const token = window.localStorage.getItem("token");

    if (!token) {
      dispatch(CHECK_LOGGED_IN.failure(null));
    }

    const { data } = await Api.checkLoggedIn();
    dispatch(CHECK_LOGGED_IN.success(null));
  } catch (err: any) {
    dispatch(CHECK_LOGGED_IN.failure(err));
  }
};
