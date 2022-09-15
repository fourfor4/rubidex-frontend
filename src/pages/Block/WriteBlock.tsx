import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Switch,
  Button,
  Form,
  Input,
  InputNumber,
  Radio,
} from "antd";

import { AppDispatch } from "../../interfaces";
import { blockState, blocksetState } from "../../redux/selectors";
import { writeBlock } from "../../redux/actions/block";
import { readBlocksetField, readBlocksetKeys } from "../../redux/actions";

const { Title, Text } = Typography;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const WriteBlock: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { isWriteBlock } = useSelector(blockState);
  const { currentBlocksetFields } = useSelector(blocksetState);

  const [isNewBlock, setIsNewBlock] = useState(false);
  const [blockName, setBlockName] = useState("");

  const initialValues = {
    blocknum: 1,
    isNewBlock: false,
  };

  const onFormValueChange = (values: any) => {
    console.log(values);
    if (Object.keys(values)[0] == "isNewBlock") {
      setIsNewBlock(values["isNewBlock"]);
    }
  };

  const onFinish = (values: any) => {
    console.log(values);
    const { isNewBlock, blocknum, ...params } = values;
    let payload: any = {
      blockname: blockName,
      blocknum: isNewBlock ? "new" : blocknum,
      content: [],
    };
    currentBlocksetFields.fields.forEach((field: string) => {
      payload.content.push(params[field]);
    });
    dispatch(writeBlock(payload));
  };

  const onReadBlocksetInfo = () => {
    dispatch(readBlocksetField(blockName));
    dispatch(readBlocksetKeys(blockName));
  };

  return (
    <div>
      <Title>Write Block</Title>
      <div className="flex items-center">
        <Text className="mr-2">Blockset Name:</Text>
        <div className="w-[150px]">
          <Input
            onChange={(e) => setBlockName(e.target.value)}
            value={blockName}
          />
        </div>
        <Button className="ml-3" type="primary" onClick={onReadBlocksetInfo}>
          Read Block Fields
        </Button>
      </div>
      <Form
        name="write-block"
        className="write-block-form"
        onValuesChange={onFormValueChange}
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <Form.Item
          label="New Block"
          name="isNewBlock"
          {...formItemLayout}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="Block Num"
          name="blocknum"
          rules={[
            {
              required: true,
              message: "please input Block Num!",
            },
          ]}
          {...formItemLayout}
        >
          <InputNumber disabled={isNewBlock} />
        </Form.Item>
        {currentBlocksetFields &&
          currentBlocksetFields.fields.map((field: string, index: number) => (
            <Form.Item
              key={index}
              label={field}
              name={field}
              rules={[
                {
                  required: true,
                  message: `Please input ${field}!`,
                },
              ]}
              {...formItemLayout}
            >
              <Input placeholder={field} />
            </Form.Item>
          ))}

        <Form.Item className="text-center">
          <Button type="primary" htmlType="submit" loading={isWriteBlock}>
            Write
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default WriteBlock;
