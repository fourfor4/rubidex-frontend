import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, InputNumber, Button, Row, Col } from "antd";
import { JSONTree } from "react-json-tree";

import { AppDispatch } from "../../interfaces";
import { readUserBlock } from "../../redux/actions";
import { blocksetState } from "../../redux/selectors";

const { Title, Text } = Typography;
const ReadUserBlock: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { currentUserBlock } = useSelector(blocksetState);
  const [blockNum, setBlockNum] = useState(0);
  const onChange = (value: number) => {
    setBlockNum(value);
  };
  const onReadBlock = () => {
    dispatch(readUserBlock(blockNum));
  };

  return (
    <div>
      <Title>Read Block</Title>
      <div>
        <Text className="mr-1">Block Number:</Text>
        <InputNumber defaultValue={0} min={0} onChange={onChange} />
        <Button className="ml-3" type="primary" onClick={onReadBlock}>
          Read Block
        </Button>
      </div>
      {currentUserBlock && (
        <Row>
          <Col md={24} lg={12}>
            <Title level={2}>Encrypted</Title>
            <JSONTree data={currentUserBlock?.encrypted} />
          </Col>
          <Col md={24} lg={12}>
            <Title level={2}>Decrypted</Title>
            <JSONTree data={currentUserBlock?.decrypted} />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ReadUserBlock;
