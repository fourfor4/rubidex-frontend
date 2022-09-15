import { notification } from "antd";
import { getType } from "typesafe-actions";
import { ERROR_MSG } from "../../enum";
import { IErrorReducer, IErrorState } from "../../interfaces/error";
import {
  CREATE_USER_BLOCKSET,
  CREATE_ADMIN_BLOCKSET,
  READ_BLOCKSET_INFO,
  SELECT_BLOCK,
  INSERT_DATA,
} from "../actions";

const initialState: IErrorState = {
  error: null,
};

export const errorReducer: IErrorReducer = (state = initialState, action) => {
  const { type, payload } = action;
  const newState = () => {
    switch (type) {
      case getType(CREATE_ADMIN_BLOCKSET.success):
        notification.success({
          message: "Created Admin Blockset successfully!",
        });
        break;
      case getType(CREATE_USER_BLOCKSET.success):
        notification.success({
          message: "Created User Blockset successfully!",
        });
        break;
      case getType(CREATE_ADMIN_BLOCKSET.failure):
      case getType(CREATE_USER_BLOCKSET.failure):
        if (payload.description == ERROR_MSG.BLOCKSET_EXISTS) {
          notification.error({ message: "Blockset already exists!!!" });
        } else {
          notification.error({ message: "Failed to create Blockset." });
        }
        break;
      case getType(READ_BLOCKSET_INFO.success):
        notification.success({
          message: "Read Blockset Information successfully!",
        });
        break;
      case getType(READ_BLOCKSET_INFO.failure):
        notification.error({
          message: "Read Blockset Information failed!",
        });
        break;
      case getType(SELECT_BLOCK.failure):
        notification.error({
          message: "Select Block failed!",
        });
        break;
    }
    return { error: payload };
  };
  return {
    ...state,
    ...newState(),
  };
};
