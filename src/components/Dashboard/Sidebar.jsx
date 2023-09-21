import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Layout, Menu, Image } from "antd";
import {
  MenuOutlined,
  SearchOutlined,
  YoutubeOutlined,
  ReadOutlined,
  UserOutlined,
  BarChartOutlined,
  BulbOutlined,
  BookOutlined,
  SettingOutlined,
  CloseOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import userGuide from "../../assets/userGuide.svg";
import EgyptianWisdomSymbol from "../../assets/EgyptianWisdomSymbol.svg";
import { Col, Row } from "antd";

const { Sider } = Layout;

const researchTopics = [
  {
    key: "multiplePdf",
    value: "Multiple PDF",
    icon: <YoutubeOutlined />,
  },
  {
    key: "youtubeVideo",
    value: "YouTube Video",
    icon: <YoutubeOutlined />,
  },
  {
    key: "article",
    value: "Article Summary",
    icon: <YoutubeOutlined />,
  },
  {
    key: "textSummary",
    value: "Text Summary",
    icon: <ReadOutlined />,
  },
  {
    key: "investigation",
    value: "Investigo",
    icon: <SearchOutlined />,
  },
];

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleSubmitMenuClick = (key) => {
    setSelectedSubMenu(key);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      style={{
        background: "#f0f2f5",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.17)",
        position: "sticky",
        top: 0,
        height: "100vh",
      }}
    >
      <div
        style={{
          padding: "16px",
          textAlign: "center",
          marginBottom: "16px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <Button
          onClick={toggleCollapsed}
          style={{
            backgroundColor: "#ffffff",
          }}
        >
          {collapsed ? <MenuOutlined /> : <CloseOutlined />}
        </Button>
      </div>

      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["2"]}
        defaultOpenKeys={["sub1"]}
        inlineCollapsed={collapsed}
        style={{ background: "#f0f2f5", borderRight: "none" }}
      >
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/profile">Profile</Link>
        </Menu.Item>

        <Menu.Item key="2" icon={<BarChartOutlined />}>
          Research State
        </Menu.Item>

        <Menu.SubMenu key="sub1" icon={<BookOutlined />} title="Notebooks">
          {researchTopics.map((topic) => (
            <Menu.Item key={topic.key} icon={<SearchOutlined />}>
              {topic.value}
            </Menu.Item>
          ))}
        </Menu.SubMenu>

        <Menu.Item key="4" icon={<SnippetsOutlined />}>
          <Link to="/dashboard">Reports</Link>
        </Menu.Item>

        <Menu.Item key="5" icon={<BulbOutlined />}>
          Dark Mode
        </Menu.Item>

        <Menu.Item
          key="6"
          icon={
            <img
              src={userGuide}
              alt="User Guide"
              style={{ width: "15px", height: "15px", color: "#834898" }} // Adjust width and height
            />
          }
        >
          User Guide
        </Menu.Item>

        <Menu.Item key="7" icon={<SettingOutlined />}>
          Settings
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
