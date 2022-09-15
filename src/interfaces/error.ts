import { IAction } from ".";

export interface IErrorState {
  error: any;
}

export type IErrorReducer = (
  state: IErrorState,
  action: IAction
) => IErrorState;
