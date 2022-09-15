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
} from "./index";
import Api from "../../helpers/axios";
import { IBlocksetFields } from "../../interfaces";

export const createUserBlockset =
  (payload: IBlocksetFields) => async (dispatch: any) => {
    dispatch(CREATE_USER_BLOCKSET.request(payload));
    try {
      const { data } = await Api.createUserBlockset(payload);
      dispatch(CREATE_USER_BLOCKSET.success(data));
    } catch (err: any) {
      dispatch(CREATE_USER_BLOCKSET.failure(err));
    }
  };

export const createAdminBlockset =
  (payload: IBlocksetFields) => async (dispatch: any) => {
    dispatch(CREATE_ADMIN_BLOCKSET.request(payload));
    try {
      const response = await Api.createAdminBlockset(payload);
      console.log(response);
      dispatch(CREATE_ADMIN_BLOCKSET.success(response));
    } catch (err: any) {
      console.log(err);
      dispatch(CREATE_ADMIN_BLOCKSET.failure(err));
    }
  };

export const readUserBlock = (blocknum: number) => async (dispatch: any) => {
  dispatch(READ_USER_BLOCK.request(blocknum));
  try {
    const { data } = await Api.readUserBlock(blocknum);
    dispatch(READ_USER_BLOCK.success(data.response));
  } catch (err) {
    dispatch(READ_USER_BLOCK.failure(err));
  }
};

export const readDataBlock =
  (blockname: string, blocknum: number) => async (dispatch: any) => {
    const args = { blockname, blocknum };
    dispatch(READ_DATA_BLOCK.request(args));
    try {
      const rawData = (await Api.readDataBlock(blocknum, blockname, "raw")).data
        .response;
      const defaultData = (
        await Api.readDataBlock(blocknum, blockname, "default")
      ).data.response;
      const fieldData = (await Api.readDataBlock(blocknum, blockname, "fields"))
        .data.response;
      dispatch(READ_DATA_BLOCK.success({ rawData, defaultData, fieldData }));
    } catch (err) {
      dispatch(READ_DATA_BLOCK.failure(err));
    }
  };

export const readBlocksetInfo =
  (blockname: string) => async (dispatch: any) => {
    dispatch(READ_BLOCKSET_INFO.request(blockname));
    try {
      const { data } = await Api.readBlocksetInfo(blockname);
      dispatch(READ_BLOCKSET_INFO.success(data.response));
    } catch (err) {
      dispatch(READ_BLOCKSET_INFO.failure(err));
    }
  };

export const readBlocksetValue =
  (blockname: string) => async (dispatch: any) => {
    dispatch(READ_BLOCKSET_VALUE.request(blockname));
    try {
      const { data } = await Api.readBlocksetValue(blockname);
      dispatch(READ_BLOCKSET_VALUE.success(data.response));
    } catch (err) {
      dispatch(READ_BLOCKSET_VALUE.failure(err));
    }
  };

export const readBlocksetField =
  (blockname: string) => async (dispatch: any) => {
    dispatch(READ_BLOCKSET_FIELD.request(blockname));
    try {
      const { data } = await Api.readBlocksetField(blockname);
      dispatch(READ_BLOCKSET_FIELD.success(data.response));
    } catch (err) {
      dispatch(READ_BLOCKSET_FIELD.failure(err));
    }
  };

export const readBlocksetStorageConfig =
  (blockname: string) => async (dispatch: any) => {
    dispatch(READ_BLOCKSET_STORAGE_CONFIG.request(blockname));
    try {
      const { data } = await Api.readBlocksetStorageConfig(blockname);
      dispatch(READ_BLOCKSET_STORAGE_CONFIG.success(data.response));
    } catch (err) {
      dispatch(READ_BLOCKSET_STORAGE_CONFIG.failure(err));
    }
  };

export const readBlocksetKeys =
  (blockname: string) => async (dispatch: any) => {
    dispatch(READ_BLOCKSET_KEYS.request(blockname));
    try {
      const { data } = await Api.readBlocksetKeys(blockname);
      dispatch(READ_BLOCKSET_KEYS.success(data.response));
    } catch (err) {
      dispatch(READ_BLOCKSET_KEYS.failure(err));
    }
  };

export const readBlockCount = (blockname: string) => async (dispatch: any) => {
  dispatch(READ_BLOCK_COUNT.request(blockname));
  try {
    const { data } = await Api.readBlockCount(blockname);
    dispatch(READ_BLOCK_COUNT.success(data.response.count));
  } catch (err) {
    dispatch(READ_BLOCK_COUNT.failure(err));
  }
};
