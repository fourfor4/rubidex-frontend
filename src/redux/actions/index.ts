import { createAsyncAction, createAction } from "typesafe-actions";

export const LOGIN = createAsyncAction(
  "loginRequest",
  "loginSuccess",
  "loginFailed"
)<any, any, Error>();
export const CHECK_LOGGED_IN = createAsyncAction(
  "checkLoginRequest",
  "checkLoginSuccess",
  "checkLoginFailed"
)<any, any, any>();

export const LOGOUT = createAction("logout")();

export const CREATE_USER_BLOCKSET = createAsyncAction(
  "createUserBlocksetRequest",
  "createUserBlocksetSuccess",
  "createUserBlocksetFailed"
)<any, any, any>();

export const CREATE_ADMIN_BLOCKSET = createAsyncAction(
  "createAdminBlocksetRequest",
  "createAdminBlocksetSuccess",
  "createAdminBlocksetFailed"
)<any, any, any>();

export const READ_USER_BLOCK = createAsyncAction(
  "readUserBlockRequest",
  "readUserBlockSuccess",
  "readUserBlockFailed"
)<any, any, any>();

export const READ_DATA_BLOCK = createAsyncAction(
  "readDataBlockRequest",
  "readDataBlockSuccess",
  "readDataBlockFailed"
)<any, any, any>();

export const READ_BLOCKSET_VALUE = createAsyncAction(
  "readBlocksetValueRequest",
  "readBlocksetValueSuccess",
  "readBlocksetValueFailed"
)<any, any, any>();

export const READ_BLOCKSET_FIELD = createAsyncAction(
  "readBlocksetFieldRequest",
  "readBlocksetFieldSuccess",
  "readBlocksetFieldFailed"
)<any, any, any>();

export const READ_BLOCKSET_STORAGE_CONFIG = createAsyncAction(
  "readBlocksetStorageConfigRequest",
  "readBlocksetStorageConfigSuccess",
  "readBlocksetStorageConfigFailed"
)<any, any, any>();

export const READ_BLOCKSET_KEYS = createAsyncAction(
  "readBlocksetKeysRequest",
  "readBlocksetKeysSuccess",
  "readBlocksetKeysFailed"
)<any, any, any>();

export const READ_BLOCKSET_INFO = createAsyncAction(
  "readBlocksetInfoRequest",
  "readBlocksetInfoSuccess",
  "readBlocksetInfoFailed"
)<any, any, any>();

export const READ_BLOCK_COUNT = createAsyncAction(
  "readBlockCountRequest",
  "readBlockCountSuccess",
  "readBlockCountFailed"
)<any, any, any>();

// Block

export const SELECT_BLOCK = createAsyncAction(
  "selectBlockRequest",
  "selectBlockSuccess",
  "SelectBlockFailed"
)<any, any, any>();

export const SELECT_DB = createAsyncAction(
  "selectDBRequest",
  "selectDBSuccess",
  "SelectDBFailed"
)<any, any, any>();

export const SET_CURRENT_PAGE = createAction("setCurrentPage")<any>();
export const SET_PAGE_LIMIT = createAction("setPageLimit")<any>();

export const INSERT_DATA = createAsyncAction(
  "insertDataRequest",
  "insertDataSuccess",
  "insertDataFailed"
)<any, any, any>();

export const WRITE_BLOCK = createAsyncAction(
  "writeBlockRequest",
  "writeBlockSuccess",
  "writeBlockFailed"
)<any, any, any>();

export * from "./auth";
export * from "./blockset";
