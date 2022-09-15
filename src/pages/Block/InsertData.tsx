import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Button,
  Input,
  Row,
  Col,
  Form,
  Checkbox,
  DatePicker,
} from "antd";
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
import { blocksetState, blockState } from "../../redux/selectors";
import { insertData } from "../../redux/actions/block";
import CryptoJS from "crypto-js";
const { Title, Text } = Typography;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 14 },
    sm: { span: 10 },
  },
};

const InsertData: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { currentBlocksetFields, currentBlocksetKeys } =
    useSelector(blocksetState);
  const { isInsertData } = useSelector(blockState);
  const [blockName, setBlockName] = useState("");
  const [dateFields, setDateFields] = useState({});
  const onChange = (event: any) => {
    setBlockName(event.target.value);
  };
  const onReadBlocksetInfo = () => {
    dispatch(readBlocksetField(blockName));
    dispatch(readBlocksetKeys(blockName));
  };
  const toHex = (str: string) => {
    let result = "";
    for (let i = 0; i < str.length; i++) {
      const hex = str.charCodeAt(i).toString(16);
      result += ("000" + hex).slice(-4);
    }
    return result;
  };
  const onFinish = async (values: any) => {
    currentBlocksetFields?.fields.forEach((field: any) => {
      if (dateFields[field as keyof Object]) {
        values[field] = values[field].unix();
      }
    });
    let str = JSON.stringify([values]);
    console.log("Origin str: ", str);
    // str = btoa(str);
    // console.log("Base64 :", str);

    if (!currentBlocksetKeys) return;

    // const { key, iv } = currentBlocksetKeys;
    const key = "My32charPasswordAndInitVectorStr";
    const iv = "My32charPassword";
    console.log(key, iv);

    const cipher = CryptoJS.AES.encrypt(str, CryptoJS.enc.Utf8.parse(key), {
      iv: CryptoJS.enc.Utf8.parse(iv),
    });
    const encrypted = cipher.toString(CryptoJS.format.Hex);
    console.log("encrypted", encrypted);

    const payload = {
      blockname: blockName,
      encryptedContent: encrypted,
    };
    dispatch(insertData(payload));
  };

  return (
    <div>
      <Title>Insert Data To Block</Title>
      <div className="flex items-center">
        <Text className="mr-2">Blockset Name:</Text>
        <div className="w-[150px]">
          <Input onChange={onChange} value={blockName} />
        </div>
        <Button className="ml-3" type="primary" onClick={onReadBlocksetInfo}>
          Read Block Fields
        </Button>
      </div>
      <Row className="mt-8">
        {currentBlocksetFields && (
          <Col sm={24}>
            <Form
              name="insert-data"
              className="insert-data-form"
              onFinish={onFinish}
            >
              {currentBlocksetFields.fields.map(
                (field: string, index: number) => (
                  <div key={index}>
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
                      {!dateFields[field as keyof Object] ? (
                        <Input placeholder={field} />
                      ) : (
                        <DatePicker placeholder={field} showTime />
                      )}
                    </Form.Item>
                    <Checkbox
                      checked={dateFields[field as keyof Object] ? true : false}
                      onChange={(e) =>
                        setDateFields({
                          ...dateFields,
                          [field]: e.target.checked,
                        })
                      }
                    >
                      Date
                    </Checkbox>
                  </div>
                )
              )}

              <Form.Item className="text-center">
                <Button type="primary" htmlType="submit" loading={isInsertData}>
                  Insert
                </Button>
              </Form.Item>
            </Form>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default InsertData;
