import { IAction } from ".";

export interface IAuthState {
  loggedIn: boolean;
  isLoggingIn: boolean;
  username: string;
}

export type IAuthReducer = (state: IAuthState, action: IAction) => IAuthState;
