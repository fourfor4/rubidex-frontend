import { IAction } from ".";

export interface IBlocksetFields {
  blockname: string;
  memofield: string[];
  totalfield: number;
  srvhost?: string;
  srvblockpath?: string;
  srvusername?: string;
  srvpassword?: string;
  cloud1host?: string;
  cloud1blockpath?: string;
  cloud1username?: string;
  cloud1password?: string;
  cloud2host?: string;
  cloud2blockpath?: string;
  cloud2username?: string;
  cloud2password?: string;
}

export interface IUserBlockData {
  field: {
    timedate: string;
    loggeduser: string;
    md5hash: string;
    blocknum: string;
    lasthash: string;
    id: string;
  };
  client: {
    firstname: string;
    username: string;
    cellphone: string;
    lastname: string;
    question5: string;
    question4: string;
    question3: string;
    question2: string;
    question1: string;
    answer5: string;
    answer4: string;
    answer3: string;
    answer2: string;
    answer1: string;
    group: string;
    email: string;
    password: string;
    workphone: string;
  };
}

export interface IUserBlock {
  encrypted: IUserBlockData;
  decrypted: IUserBlockData;
}

export interface IDataBlock {
  rawData: any;
  defaultData: any;
  fieldData: any;
}
export interface IBlocksetState {
  isCreating: boolean;
  isReadingBlock: boolean;
  currentBlockset: IBlocksetFields | null;
  currentUserBlock: IUserBlock | null;
  currentDataBlock: IDataBlock | null;
  currentBlocksetInfo: any;
  currentBlocksetFields: any;
  currentBlocksetStorageConfig: any;
  currentBlocksetKeys: any;
  blockCount: number;
}

export type IBlocksetReducer = (
  state: IBlocksetState,
  action: IAction
) => IBlocksetState;
