import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  getItem("About Info", "1", <InfoCircleOutlined />), // Updated icon here
  getItem("User guide", "2", <QuestionCircleOutlined />),
];

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedMenuItemKey, setSelectedMenuItemKey] = useState("1"); // Initial selected menu item
  const navigate = useNavigate(); // Get the navigate function

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuItemClick = (key) => {
    setSelectedMenuItemKey(key);

    // Check if the clicked menu item is "Notebooks" and navigate to "/dashboard"
    if (key === "2") {
      navigate("/dashboard");
    }
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
          width: "30px",
          height: "30px",
          backgroundColor: "#f0f0f0",
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        selectedKeys={[selectedMenuItemKey]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
        onClick={({ key }) => handleMenuItemClick(key)}
        style={{ height: "100vh", background: "f0f0f0" }}
      />
    </div>
  );
};

export default SideBar;
