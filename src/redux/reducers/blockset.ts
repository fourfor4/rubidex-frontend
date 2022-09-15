import { getType } from "typesafe-actions";
import {
  CREATE_USER_BLOCKSET,
  CREATE_ADMIN_BLOCKSET,
  READ_USER_BLOCK,
  READ_BLOCKSET_INFO,
  READ_BLOCK_COUNT,
  READ_DATA_BLOCK,
  READ_BLOCKSET_VALUE,
  READ_BLOCKSET_FIELD,
  READ_BLOCKSET_STORAGE_CONFIG,
  READ_BLOCKSET_KEYS,
} from "../actions";
import { IAction, IBlocksetReducer, IBlocksetState } from "../../interfaces";

const initialState: IBlocksetState = {
  currentBlockset: null,
  currentUserBlock: null,
  currentDataBlock: null,
  currentBlocksetInfo: null,
  currentBlocksetFields: null,
  currentBlocksetStorageConfig: null,
  currentBlocksetKeys: null,
  isCreating: false,
  isReadingBlock: false,
  blockCount: 0,
};

export const BlocksetReducer: IBlocksetReducer = (
  state = initialState,
  action: IAction
) => {
  const { type, payload } = action;
  const newState = () => {
    switch (type) {
      case getType(CREATE_USER_BLOCKSET.request):
        return { isCreating: false };
      case getType(CREATE_USER_BLOCKSET.success):
        return { isCreating: true };
      case getType(CREATE_USER_BLOCKSET.failure):
        return { isCreating: false };
      case getType(CREATE_ADMIN_BLOCKSET.request):
        return { isCreating: true };
      case getType(CREATE_ADMIN_BLOCKSET.success):
        return { isCreating: false };
      case getType(CREATE_ADMIN_BLOCKSET.failure):
        return { isCreating: false };
      case getType(READ_USER_BLOCK.request):
        return { isReadingBlock: true };
      case getType(READ_USER_BLOCK.success):
        return { isReadingBlock: false, currentUserBlock: payload };
      case getType(READ_USER_BLOCK.failure):
        return { isReadingBlock: false, currentUserBlock: null };
      case getType(READ_DATA_BLOCK.request):
        return { isReadingBlock: true };
      case getType(READ_DATA_BLOCK.success):
        return { isReadingBlock: false, currentDataBlock: payload };
      case getType(READ_DATA_BLOCK.failure):
        return { isReadingBlock: false, currentDataBlock: null };
      case getType(READ_BLOCKSET_INFO.request):
        return { isReadingBlock: true };
      case getType(READ_BLOCKSET_INFO.success):
        return { isReadingBlock: false, currentBlocksetInfo: payload };
      case getType(READ_BLOCKSET_INFO.failure):
        return { isReadingBlock: false, currentBlocksetInfo: null };
      case getType(READ_BLOCKSET_VALUE.request):
        return { isReadingBlock: true };
      case getType(READ_BLOCKSET_VALUE.success):
        return { isReadingBlock: false, currentBlockset: payload };
      case getType(READ_BLOCKSET_VALUE.failure):
        return { isReadingBlock: false, currentBlockset: null };
      case getType(READ_BLOCKSET_FIELD.request):
        return { isReadingBlock: true };
      case getType(READ_BLOCKSET_FIELD.success):
        return { isReadingBlock: false, currentBlocksetFields: payload };
      case getType(READ_BLOCKSET_FIELD.failure):
        return { isReadingBlock: false, currentBlocksetFields: null };
      case getType(READ_BLOCKSET_STORAGE_CONFIG.request):
        return { isReadingBlock: true };
      case getType(READ_BLOCKSET_STORAGE_CONFIG.success):
        return { isReadingBlock: false, currentBlocksetStorageConfig: payload };
      case getType(READ_BLOCKSET_STORAGE_CONFIG.failure):
        return { isReadingBlock: false, currentBlocksetStorageConfig: null };
      case getType(READ_BLOCKSET_KEYS.request):
        return { isReadingBlock: true };
      case getType(READ_BLOCKSET_KEYS.success):
        return { isReadingBlock: false, currentBlocksetKeys: payload };
      case getType(READ_BLOCKSET_KEYS.failure):
        return { isReadingBlock: false, currentBlocksetKeys: null };
      case getType(READ_BLOCK_COUNT.request):
        return { isReadingBlock: true };
      case getType(READ_BLOCK_COUNT.success):
        return { isReadingBlock: false, blockCount: payload };
      case getType(READ_BLOCK_COUNT.failure):
        return { isReadingBlock: false, blockCount: null };
      default:
        return state;
    }
  };
  return {
    ...state,
    ...newState(),
  };
};
