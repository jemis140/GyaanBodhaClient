import React from "react";
import { Layout, Row, Col } from "antd";
import { Typography } from "antd";

const { Header } = Layout;
const { Title } = Typography;

const TopMenu = () => {
  const headerStyle = {
    background: "linear-gradient(to right, #4d2882, #b74400)",
  };

  const titleStyle = {
    background: "linear-gradient(to right, #502f73, #ff8c40)",
    WebkitBackgroundClip: "text",
    color: "white",
  };

  const menuItemsStyle = {
    display: "flex",
    listStyle: "none",
    justifyContent: "flex-end",
  };

  const menuItemStyle = {
    margin: "0 16px",
    color: "white",
  };

  return (
    <Header style={headerStyle}>
      <Row justify="center">
        <Col span={6}>
          <Title level={3} style={titleStyle}>
            GyaanBodha
          </Title>
        </Col>
        <Col span={18}>
          <ul style={menuItemsStyle}>
            <li style={menuItemStyle}>Research Reports</li>
            <li style={menuItemStyle}>Research Topics</li>
            <li style={menuItemStyle}>Profile</li>
            <li style={menuItemStyle}>Settings</li>
          </ul>
        </Col>
      </Row>
    </Header>
  );
};

export default TopMenu;
