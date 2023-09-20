import React from "react";
import { Layout, Menu, Row, Col } from "antd";
import { UserOutlined, SettingOutlined } from "@ant-design/icons";
import { Typography } from "antd";
const { Header } = Layout;
const { Title } = Typography;

const TopMenu = () => {
  return (
    <Header style={{ backgroundColor: "#502f73", color: "white" }}>
      <Row justify="center">
        <Col span={6}>
          <Title level={3} style={{ color: "white" }}>
            GyaanBodha
          </Title>
        </Col>
        <Col span={18}>
          {/* Menu items */}
          {/* Adjust the menu items and styles accordingly */}
          {/* For demonstration, I'm using placeholders */}
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              justifyContent: "flex-end",
            }}
          >
            <li style={{ margin: "0 16px", color: "white" }}>
              Research Reports
            </li>
            <li style={{ margin: "0 16px", color: "white" }}>
              Research Topics
            </li>
            <li style={{ margin: "0 16px", color: "white" }}>Profile</li>
            <li style={{ margin: "0 16px", color: "white" }}>Settings</li>
          </ul>
        </Col>
      </Row>
    </Header>
  );
};

export default TopMenu;
