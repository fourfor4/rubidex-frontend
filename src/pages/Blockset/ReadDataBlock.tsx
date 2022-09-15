import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, InputNumber, Button, Row, Col, Input } from "antd";
import { JSONTree } from "react-json-tree";

import { AppDispatch } from "../../interfaces";
import { readDataBlock } from "../../redux/actions";
import { blocksetState } from "../../redux/selectors";

const { Title, Text } = Typography;
const ReadDataBlock: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { currentDataBlock } = useSelector(blocksetState);
  const [blockNum, setBlockNum] = useState(0);
  const [blockName, setBlockName] = useState("");
  const onBlockNumberChange = (value: number) => {
    setBlockNum(value);
  };
  const onBlockNameChange = (e: any) => {
    setBlockName(e.target.value);
  };
  const onReadBlock = () => {
    dispatch(readDataBlock(blockName, blockNum));
  };

  return (
    <div>
      <Title>Read Data Block</Title>
      <div className="flex items-center">
        <Text className="mr-2">Block Name:</Text>
        <div className="w-[80px]">
          <Input onChange={onBlockNameChange} />
        </div>
        <Text className="ml-3 mr-2">Block Number:</Text>
        <InputNumber defaultValue={0} min={0} onChange={onBlockNumberChange} />
        <Button className="ml-3" type="primary" onClick={onReadBlock}>
          Read Data Block
        </Button>
      </div>
      {currentDataBlock && (
        <Row>
          <Col sm={24} md={8} lg={8}>
            <Title level={2}>Raw</Title>
            <JSONTree data={currentDataBlock?.rawData} />
          </Col>
          <Col sm={24} md={8} lg={8}>
            <Title level={2}>Default</Title>
            <JSONTree data={currentDataBlock?.defaultData} />
          </Col>
          <Col sm={24} md={8} lg={8}>
            <Title level={2}>Fields</Title>
            <JSONTree data={currentDataBlock?.fieldData} />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ReadDataBlock;
