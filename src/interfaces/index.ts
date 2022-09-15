import { ThunkDispatch } from "redux-thunk";

export * from "./blockset";
export * from "./block";
export * from "./auth";

export type IAction = {
  type: string;
  payload: any;
};
export type AppDispatch = ThunkDispatch<{}, {}, any>;
