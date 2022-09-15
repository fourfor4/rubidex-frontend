import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Button, Input, Row, Col } from "antd";
import { JSONTree } from "react-json-tree";

import { AppDispatch } from "../../interfaces";
import {
  readBlockCount,
  readBlocksetField,
  readBlocksetInfo,
  readBlocksetKeys,
  readBlocksetStorageConfig,
  readBlocksetValue,
} from "../../redux/actions";
import { blocksetState } from "../../redux/selectors";

const { Title, Text } = Typography;
const ReadBlocksetInfo: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    currentBlocksetInfo,
    currentBlockset,
    currentBlocksetFields,
    currentBlocksetKeys,
    currentBlocksetStorageConfig,
    blockCount,
  } = useSelector(blocksetState);
  const [blocksetName, setBlocksetName] = useState("");
  const onChange = (event: any) => {
    setBlocksetName(event.target.value);
  };
  const onReadBlocksetInfo = () => {
    dispatch(readBlocksetInfo(blocksetName));
    dispatch(readBlockCount(blocksetName));
    dispatch(readBlocksetField(blocksetName));
    dispatch(readBlocksetValue(blocksetName));
    dispatch(readBlocksetStorageConfig(blocksetName));
    dispatch(readBlocksetKeys(blocksetName));
  };

  return (
    <div>
      <Title>Read Block Information</Title>
      <div className="flex items-center">
        <Text className="mr-2">Blockset Name:</Text>
        <div className="w-[150px]">
          <Input onChange={onChange} />
        </div>
        <Button className="ml-3" type="primary" onClick={onReadBlocksetInfo}>
          Read
        </Button>
      </div>
      {currentBlocksetInfo && (
        <div>
          <Title level={2}>Blockset Info</Title>
          <JSONTree data={currentBlocksetInfo} />
        </div>
      )}
      {blockCount !== 0 && (
        <div>
          <Title level={3}>Block Count: {blockCount}</Title>
        </div>
      )}
      <Row>
        {currentBlockset && (
          <Col sm={24} md={12}>
            <Title level={2}>Blockset Fields</Title>
            <JSONTree data={currentBlocksetFields} />
          </Col>
        )}
        {currentBlocksetKeys && (
          <Col sm={24} md={12}>
            <Title level={2}>Blockset Keys</Title>
            <JSONTree data={currentBlocksetKeys} />
          </Col>
        )}
      </Row>
      <Row>
        {currentBlockset && (
          <Col sm={24} md={12}>
            <Title level={2}>Blockset Values</Title>
            <JSONTree data={currentBlockset} />
          </Col>
        )}
        {currentBlocksetStorageConfig && (
          <Col sm={24} md={12}>
            <Title level={2}>Blockset Storage Config</Title>
            <JSONTree data={currentBlocksetStorageConfig} />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default ReadBlocksetInfo;
