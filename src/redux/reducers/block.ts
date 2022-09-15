import { getType } from "typesafe-actions";
import {
  INSERT_DATA,
  SELECT_BLOCK,
  SELECT_DB,
  SET_CURRENT_PAGE,
  WRITE_BLOCK,
} from "../actions";
import { IAction, IBlockState, IBlockReducer } from "../../interfaces";
import { notification } from "antd";

const initialState: IBlockState = {
  blocks: [],
  isSelectingBlock: false,
  isInsertData: false,
  isWriteBlock: false,
  dbData: [],
  dbTotalCount: 0,
  dbCurrentPage: 1,
  dbPageLimit: 10,
};

export const BlockReducer: IBlockReducer = (
  state = initialState,
  action: IAction
) => {
  const { type, payload } = action;
  const newState = () => {
    switch (type) {
      case getType(SELECT_BLOCK.request):
        return { isSelectingBlock: true };
      case getType(SELECT_BLOCK.success):
        return { isSelectingBlock: false, blocks: payload };
      case getType(INSERT_DATA.request):
        return { isInsertData: true };
      case getType(SELECT_DB.success):
        notification.success({
          message: "Select from Database success!",
        });
        return { dbData: payload.rows, dbTotalCount: payload.count };
      case getType(SET_CURRENT_PAGE):
        return { dbCurrentPage: payload };
      case getType(INSERT_DATA.failure):
        notification.error({
          message: "Insert Data failed!",
        });
        return { isInsertData: false };
      case getType(INSERT_DATA.success):
        notification.success({
          message: "Insert Data Successfully!",
        });
        return { isInsertData: false };
      case getType(WRITE_BLOCK.request):
        return { isWriteBlock: true };
      case getType(WRITE_BLOCK.success):
        notification.success({
          message: "Write Block Successfully!",
        });
        return { isWriteBlock: false };
      case getType(WRITE_BLOCK.failure):
        notification.error({
          message: "Write Block Failed!",
        });
        return { isWriteBlock: false };
    }
  };
  return {
    ...state,
    ...newState(),
  };
};
