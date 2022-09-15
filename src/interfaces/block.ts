import { IAction } from ".";

export interface IBlockFields {
  blockname: string;
  field: string;
  value: string;
  enc: boolean;
  currentPage: number;
  pageLimit: number;
}

export interface IDBQueryFields {
  field: string;
  value: string;
  currentPage: number;
  pageLimit: number;
}

export interface IBlockState {
  isSelectingBlock: boolean;
  blocks: [];
  isInsertData: boolean;
  isWriteBlock: boolean;
  dbData: [];
  dbTotalCount: number;
  dbCurrentPage: number;
  dbPageLimit: number;
}

export type IBlockReducer = (
  state: IBlockState,
  action: IAction
) => IBlockState;
