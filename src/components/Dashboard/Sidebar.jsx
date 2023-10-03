import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Layout, Menu, Image } from "antd";
import {
  BarChartOutlined,
  BookOutlined,
  CloseOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SnippetsOutlined,
  QuestionCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Research State", "1", <BarChartOutlined />),
  getItem("Notebooks", "2", <BookOutlined />),
  getItem("Reports", "3", <SnippetsOutlined />),
  getItem("About Info", "4", <InfoCircleOutlined />), // Updated icon here
  getItem("User guide", "5", <QuestionCircleOutlined />),
];

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      style={{
        marginTop: "60px",
        flexDirection: "column",
        zIndex: "1",
        backgroundColor: "#f0f0f0",
        position: "fixed",
        zIndex: "1",
        height: "100vh",
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          border: 1,
          color: "#14042e",
          backgroundColor: "#f0f0f0",
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
        style={{ height: "100vh", background: "f0f0f0" }}
      />
    </div>
  );
};

export default SideBar;
