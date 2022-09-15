import { IAuthState, IBlocksetState, IBlockState } from "../../interfaces";

export const authState = (state: any) => state.auth as IAuthState;
export const blocksetState = (state: any) => state.blockset as IBlocksetState;
export const blockState = (state: any) => state.block as IBlockState;
