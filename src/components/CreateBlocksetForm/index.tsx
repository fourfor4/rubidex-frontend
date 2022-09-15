import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { IBlocksetFields } from "../../interfaces/blockset";
import { AppDispatch } from "../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { createUserBlockset } from "../../redux/actions";
import { blocksetState } from "../../redux/selectors";

const initialValue: IBlocksetFields = {
  blockname: "",
  memofield: [""],
  totalfield: 0,
};

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
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

interface IProps {
  onSubmit: (values: IBlocksetFields) => void;
  isCreating: boolean;
}

const CreateBlocksetForm: React.FC<IProps> = ({ onSubmit, isCreating }) => {
  const onFinish = (values: any) => {
    const requestData = {
      blockname: values.blockname,
      totalfield: values.memofield.length,
      memofield: values.memofield,
    };
    onSubmit(requestData);
  };
  return (
    <Form
      name="create-blockset"
      className="create-blockset-form"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
      initialValues={initialValue}
    >
      <Form.Item
        label="Blockset Name"
        name="blockname"
        rules={[{ required: true, message: "Please input blockset name!" }]}
        {...formItemLayout}
      >
        <Input placeholder="Blockset name" />
      </Form.Item>
      <Form.List
        name="memofield"
        rules={[
          {
            validator: async (_, fields) => {
              if (!fields || fields.length < 1) {
                return Promise.reject(new Error("At least 1 field"));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? "Blockset Fields" : ""}
                required={true}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={["onChange", "onBlur"]}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input field value or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="Field value"
                    style={{ width: "60%", marginRight: 8 }}
                  />
                </Form.Item>
                {fields.length > 0 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: "60%" }}
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item className="text-center">
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={isCreating}
        >
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateBlocksetForm;
