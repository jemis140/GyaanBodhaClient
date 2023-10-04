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
    background: "linear-gradient(to right, #4d2882, #b74400)", // Adjust gradient colors
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed", // Set position to fixed
    width: "100%", // Set width to 100% to cover the entire screen
    zIndex: 1000, // Set a high z-index to ensure it stays on top
  };

  const titleStyle = {
    background: "linear-gradient(to down, #b74400, #f0f0f0)", // Adjust gradient colors
    WebkitBackgroundClip: "text",
    color: "#f0f0f0",
  };

  const menuStyle = {
    background: "transparent", // Adjust the background to be transparent
  };

  return (
    <Header style={headerStyle}>
      <Title style={titleStyle} level={3}>
        GyaanBodhi
      </Title>
      <Menu mode="horizontal" theme="dark" selectable={false} style={menuStyle}>
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
