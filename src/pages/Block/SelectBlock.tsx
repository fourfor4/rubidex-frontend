import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Switch,
  Button,
  Row,
  Col,
  Input,
  DatePicker,
  notification,
  Pagination,
} from "antd";
import type { RangePickerProps } from "antd/es/date-picker";

import { JSONTree } from "react-json-tree";

import { AppDispatch } from "../../interfaces";
import {
  readDataBlock,
  SET_CURRENT_PAGE,
  SET_PAGE_LIMIT,
} from "../../redux/actions";
import { blockState } from "../../redux/selectors";
import { selectBlock, selectFromDB } from "../../redux/actions/block";
import CryptoJS from "crypto-js";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const ReadDataBlock: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { blocks, dbCurrentPage, dbData, dbTotalCount, dbPageLimit } =
    useSelector(blockState);
  console.log("dbPageLimit : ", dbPageLimit);
  const [blockName, setBlockName] = useState("");
  const [field, setField] = useState("");
  const [value, setValue] = useState("");
  const [encryptStatus, setEncryptStatus] = useState(false);

  const onBlockNameChange = (e: any) => {
    setBlockName(e.target.value);
  };

  const onSearchFieldChange = (e: any) => {
    setField(e.target.value);
  };

  const onSearchValueChange = (e: any) => {
    setValue(e.target.value);
  };

  const onEncryptStatusChange = (e: any) => {
    setEncryptStatus(e);
  };

  const onSelectBlock = (currentPage: number, pageSize: number) => {
    let errorMsg = "";
    if (blockName === "") {
      errorMsg = "Please insert Block Name";
      notification.error({
        message: errorMsg,
      });
    } else if (field === "") {
      errorMsg = "Please insert search field";
      notification.error({
        message: errorMsg,
      });
    } else if (value == "") {
      errorMsg = "Please insert search value";
      notification.error({
        message: errorMsg,
      });
    } else {
      const payload = {
        blockname: blockName,
        field: field,
        value: value,
        enc: encryptStatus,
        currentPage: currentPage,
        pageLimit: pageSize,
      };
      console.log(payload);
      dispatch(selectBlock(payload));
      dispatch(SET_CURRENT_PAGE(currentPage));
      dispatch(SET_PAGE_LIMIT(pageSize));
      selectDB(currentPage, pageSize);
    }
  };

  const selectDB = (currentPage: number, pageSize: number) => {
    const dbPayload = {
      field: field,
      value: value,
      currentPage: currentPage,
      pageLimit: pageSize,
    };

    dispatch(selectFromDB(dbPayload));
  };

  const decrypt = (data: string) => {
    if (!data) return "";
    // const key = "My32charPasswordAndInitVectorStr";
    const key = "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";
    const iv = "My32charPassword";

    const cipher = CryptoJS.AES.decrypt(
      CryptoJS.enc.Hex.parse(data).toString(CryptoJS.enc.Base64),
      CryptoJS.enc.Utf8.parse(key),
      {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    console.log(cipher);
    const decrypted = cipher.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  };

  useEffect(() => {
    dispatch(SET_CURRENT_PAGE(0));
  }, []);

  return (
    <div>
      <Title>Select Block</Title>
      <div className="flex items-center">
        <Text className="mr-2">Block Name:</Text>
        <div className="w-[80px]">
          <Input onChange={onBlockNameChange} value={blockName} />
        </div>
        <Text className="ml-3 mr-2">Search field:</Text>
        <div className="w-[80px]">
          <Input onChange={onSearchFieldChange} value={field} />
        </div>
        <Text className="ml-3 mr-2">Value:</Text>
        <div className="w-[120px]">
          <Input onChange={onSearchValueChange} value={value} />
        </div>
        <Text className="ml-3 mr-2">Encrypt:</Text>
        <Switch checked={encryptStatus} onChange={onEncryptStatusChange} />
        <Button
          className="ml-3"
          type="primary"
          onClick={() => onSelectBlock(1, dbPageLimit)}
        >
          Select Block
        </Button>
      </div>
      <Row>
        <Col sm={24} md={8} lg={8}>
          ENCRYPTED(From Blockset)
        </Col>
        <Col sm={24} md={8} lg={8}>
          DECRYPED(On Site)
        </Col>
        <Col sm={24} md={8} lg={8}>
          Databse
        </Col>
        {dbData.map((data, index) => (
          <>
            <Col sm={24} md={8} lg={8}>
              <JSONTree shouldExpandNode={() => false} data={blocks[index]} />
            </Col>
            <Col sm={24} md={8} lg={8}>
              <JSONTree data={decrypt(blocks[index])} />
            </Col>
            <Col sm={24} md={8} lg={8}>
              <JSONTree shouldExpandNode={() => false} data={data} />
            </Col>
          </>
        ))}
        <Col sm={24}>
          <Pagination
            className="text-center"
            // current={dbCurrentPage}
            total={dbTotalCount}
            pageSize={dbPageLimit}
            onChange={(currentPage, pageSize) => {
              console.log(currentPage);
              onSelectBlock(currentPage, pageSize);
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ReadDataBlock;
