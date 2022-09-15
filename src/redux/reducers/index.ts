import { combineReducers } from "redux";
import { AuthReducer } from "./auth";
import { BlockReducer } from "./block";
import { BlocksetReducer } from "./blockset";
import { errorReducer } from "./error";

const rootReducer = combineReducers({
  auth: AuthReducer,
  blockset: BlocksetReducer,
  block: BlockReducer,
  error: errorReducer,
});

export default rootReducer;
