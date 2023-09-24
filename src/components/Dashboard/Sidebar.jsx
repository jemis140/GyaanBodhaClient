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
  MenuFoldOutlined,
  AppstoreOutlined,
  MailOutlined,
  PieChartOutlined,
  MenuUnfoldOutlined,
  SnippetsOutlined,
  QuestionCircleOutlined,
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

const ToggleButton = ({ collapsed, toggleCollapsed }) => {
  return (
    <Button
      onClick={toggleCollapsed}
      style={{
        backgroundColor: "#ffffff",
        borderColor: "#502f73",
        borderRadius: "4px",
        position: "absolute",
        top: "16px",
        right: collapsed ? "16px" : "250px", // Adjust right position
        zIndex: 1,
      }}
    >
      {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </Button>
  );
};

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleSubmitMenuClick = (key) => {
    setSelectedSubMenu(key);
  };

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        style={{
          backgroundColor: "#f0f2f5",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.17)",
          position: "fixed",
          zIndex: "1",
          height: "100vh",
        }}
      >
        <Row>
          <Col>
            <Button
              onClick={toggleCollapsed}
              style={{ marginLeft: 4, backgroundColor: "#502f73" }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
          </Col>
        </Row>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["2"]}
          defaultOpenKeys={["sub1"]}
          inlineCollapsed={collapsed}
          style={{
            marginTop: "30px",
            background: "#f0f2f5",
            borderRight: "none",
          }}
        >
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
          <Menu.Item key="7" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
          <Menu.Item key="7" icon={<QuestionCircleOutlined />}>
            user guide
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
};

export default SideBar;
