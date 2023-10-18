import React from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Typography, message } from "antd";
import { auth } from "../../firebase";
import {
  UserOutlined,
  SettingOutlined,
  DownOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { signOut } from "firebase/auth";

const { Header } = Layout;
const { Title } = Typography;
const { SubMenu } = Menu;

const TopMenu = ({ currentUser }) => {
  const navigate = useNavigate();
  const headerStyle = {
    background: "linear-gradient(to right, #4d2882, #b74400)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    width: "100%",
    zIndex: 1000,
  };

  const titleStyle = {
    background: "linear-gradient(to down, #b74400, #f0f0f0)",
    WebkitBackgroundClip: "text",
    color: "#f0f0f0",
  };

  const menuStyle = {
    background: "transparent",
  };

  const handleSignout = async () => {
    try {
      // Clear relevant data from localStorage and localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      await signOut(auth);
      navigate("/login");
      console.log("Signed out successfully");
    } catch (error) {
      message.info("Something went wrong");
    }
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
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={handleSignout}
          >
            Logout
          </Menu.Item>
          <Menu.Item key="help" icon={<QuestionCircleOutlined />}>
            Help
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          Settings
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default TopMenu;
