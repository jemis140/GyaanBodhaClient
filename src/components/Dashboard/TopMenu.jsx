import React from "react";
import { Layout, Row, Col, Menu, Typography } from "antd";
import {
  UserOutlined,
  BulbOutlined,
  SettingOutlined,
  DownOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;
const { SubMenu } = Menu;

const TopMenu = () => {
  const headerStyle = {
    background: "linear-gradient(to right, #4d2882, #b74400)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    zIndex: 1,
  };

  const titleStyle = {
    background: "linear-gradient(to right, #502f73, #ff8c40)",
    WebkitBackgroundClip: "text",
    color: "white",
  };

  return (
    <Header style={headerStyle}>
      <Title level={3} style={titleStyle}>
        GyaanBodha
      </Title>
      <Menu mode="horizontal" theme="dark" selectable={false}>
        <SubMenu
          key="profile"
          icon={<UserOutlined />}
          title={
            <span>
              Profile
              <DownOutlined />
            </span>
          }
        >
          <Menu.Item key="user-info">User Info</Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
          <Menu.Item key="help" icon={<QuestionCircleOutlined />}>
            Help
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          Settings
        </Menu.Item>
        <Menu.Item key="dark-mode" icon={<BulbOutlined />}>
          Dark Mode
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default TopMenu;
