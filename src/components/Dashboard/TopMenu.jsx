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
    overflow: "hidden",
  };

  const titleStyle = {
    background: "linear-gradient(to right, #502f73, #ff8c40)",
    WebkitBackgroundClip: "text",
    color: "white",
  };

  return (
    <Header style={headerStyle}>
      <Row justify="space-between" align="middle">
        <Col span={6}>
          <Title level={3} style={titleStyle}>
            GyaanBodha
          </Title>
        </Col>
        <Col
          span={18}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Menu mode="horizontal" style={titleStyle}>
            <SubMenu
              key="profile"
              title={
                <span>
                  <UserOutlined />
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
        </Col>
      </Row>
    </Header>
  );
};

export default TopMenu;
