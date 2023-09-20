import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Layout, Menu } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  YoutubeOutlined,
  FileTextOutlined,
  ReadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Row, Slider } from "antd";
import AccordionComponent from "../common/Accordion";
import CustomAvatar from "../common/Avatar";
import ResearchStats from "../researchstate/SideBarState";

const { Sider, Content } = Layout;

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
    icon: <FileTextOutlined />,
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
    <div style={{}}>
      <Sider
        width={256}
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        style={{
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          overflowY: "auto", // Add scrolling if needed
        }}
      >
        <Row justify="end">
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
          style={{ height: "100vh", background: "#f5f5f5" }}
        >
          <Menu.Item
            key="1"
            icon={<UserOutlined style={{ color: "#834898" }} />}
          >
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="2">Research State</Menu.Item>
          <Menu.SubMenu
            key="sub1"
            icon={<SearchOutlined style={{ color: "#834898" }} />}
            title="ResearchTopic"
          >
            {researchTopics.map((topic) => (
              <Menu.Item
                key={topic.key}
                icon={<SearchOutlined style={{ color: "#834898" }} />}
              >
                {topic.value}
              </Menu.Item>
            ))}
          </Menu.SubMenu>
          <Menu.SubMenu
            key="sub2"
            icon={<SearchOutlined />}
            title="ResearchTopic"
          >
            {researchTopics.map((topic) => (
              <Menu.Item
                key={topic.key}
                icon={topic.icon}
                style={{
                  backgroundColor:
                    selectedSubMenu === topic.key ? "#834898" : "transparent",
                }}
                onClick={() => handleSubmitMenuClick(topic.key)}
              >
                {topic.value}
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        </Menu>
      </Sider>
    </div>
  );
};

export default SideBar;
