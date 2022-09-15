import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { doLogin } from "../../redux/actions";
import { authState } from "../../redux/selectors";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    dispatch(doLogin(values) as any);
  };
  const { loggedIn } = useSelector(authState);
  useEffect(() => {
    if (loggedIn) {
      navigate("/dashboard");
    }
  }, [loggedIn]);

  return (
    <div className="flex min-h-screen relative p-5 bg-gradient-to-r from-cyan-500 to-blue-500 flex-col justify-center items-center">
      <img
        src="assets/rubidex-logo-nav.svg"
        className="absolute top-5 left-5"
      />
      <h1 className="gradient-text mb-5 font-sans lg:text-5xl text-3xl text-center text-white">
        Welcome To RubiDex!
      </h1>
      <div className=" w-full max-w-[500px] h-fit bg-white shadow-md p-6 rounded-xl">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item className="text-center">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
