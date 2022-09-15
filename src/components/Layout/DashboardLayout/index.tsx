import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  BarChartOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, MenuProps } from "antd";

import { AppDispatch } from "../../../interfaces";
import { doLogout } from "../../../redux/actions";
import "./index.scss";

const { Header, Content, Footer, Sider } = Layout;
const items = [
  {
    icon: UserOutlined,
    label: "User",
    key: "user",
    children: [
      {
        key: "read-user-block",
        label: <NavLink to="user/readblock">Read User Block</NavLink>,
      },
    ],
  },
  {
    icon: BarChartOutlined,
    label: "Blockset",
    key: "blockset",
    children: [
      {
        key: "create-user-blockset",
        label: (
          <NavLink to="blockset/create/user">Create User Blockset</NavLink>
        ),
      },
      {
        key: "create-admin-blockset",
        label: (
          <NavLink to="blockset/create/admin">Create Admin Blockset</NavLink>
        ),
      },
      {
        key: "read-blockset-info",
        label: (
          <NavLink to="blockset/read/blockset-info">Read Blockset Info</NavLink>
        ),
      },
      {
        key: "read-data-block",
        label: <NavLink to="blockset/read/data-block">Read Data Block</NavLink>,
      },
    ],
  },
  {
    icon: BarChartOutlined,
    label: "Block",
    key: "block",
    children: [
      {
        key: "select-block",
        label: <NavLink to="block/select">Select Block</NavLink>,
      },
      {
        key: "write-block",
        label: <NavLink to="block/write">Write Block</NavLink>,
      },
      {
        key: "insert-data",
        label: <NavLink to="block/insertdata">Insert Data</NavLink>,
      },
    ],
  },
];

const items2: MenuProps["items"] = items.map(
  ({ icon, key: key1, label, children }) => {
    return {
      key: `${key1}`,
      icon: React.createElement(icon),
      label,
      children: children.map(({ key: key2, label: label2 }) => ({
        key: key2,
        label: label2,
      })),
    };
  }
);

const DashboardLayout: React.FC<{ children: any }> = (props) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const signOut = () => {
    dispatch(doLogout());
    navigate("/login");
  };
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="dashboard-logo">
          <img src="/assets/rubidex-logo-nav.svg" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items2}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          className="site-layout-background text-right mr-3"
          style={{
            padding: 0,
          }}
        >
          <Button onClick={signOut} icon={<UserOutlined />}>
            Sign out
          </Button>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          {props.children}
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Rubidex ©2022 Created by @@@
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
