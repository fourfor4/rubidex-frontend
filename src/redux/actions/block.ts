import { INSERT_DATA, SELECT_BLOCK, SELECT_DB, WRITE_BLOCK } from "./index";
import Api from "../../helpers/axios";
import { IBlockFields, IDBQueryFields } from "../../interfaces";

export const selectBlock = (payload: IBlockFields) => async (dispatch: any) => {
  const { blockname, field, value, enc, currentPage, pageLimit } = payload;
  dispatch(SELECT_BLOCK.request(blockname));
  try {
    const data = await Api.selectBlock(
      blockname,
      field,
      value,
      enc ? 1 : 0,
      currentPage,
      pageLimit
    );
    console.log("select block", data);
    // dispatch(SELECT_BLOCK.success(data.response.blocks));
  } catch (error: any) {
    console.log("select block error", error);
    dispatch(SELECT_BLOCK.failure);
  }
};

export const selectFromDB =
  (payload: IDBQueryFields) => async (dispatch: any) => {
    const { field, value, currentPage, pageLimit } = payload;
    dispatch(SELECT_DB.request(field));
    try {
      const { data } = await Api.selectFromDB(
        field,
        value,
        currentPage,
        pageLimit
      );
      console.log(data);
      dispatch(SELECT_DB.success(data));
    } catch (error: any) {
      console.log(error);
      dispatch(SELECT_DB.failure);
    }
  };

export const insertData = (payload: any) => async (dispatch: any) => {
  const { blockname, encryptedContent } = payload;
  dispatch(INSERT_DATA.request(blockname));
  try {
    const data = await Api.insertData(blockname, encryptedContent);
    console.log(data);
    dispatch(INSERT_DATA.success(blockname));
  } catch (error: any) {
    console.log(error);
    dispatch(INSERT_DATA.failure(error));
  }
};

export const writeBlock = (payload: any) => async (dispatch: any) => {
  const { blockname, blocknum, content } = payload;
  dispatch(WRITE_BLOCK.request(blockname));
  try {
    const { data } = await Api.writeBlock(
      blockname,
      blocknum,
      "fields",
      content
    );
    console.log(data);
    dispatch(WRITE_BLOCK.success(blockname));
  } catch (error) {
    console.log(error);
    dispatch(WRITE_BLOCK.failure(error));
  }
};
