import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  AreaChartOutlined,
  BookOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {
  return (
    <Sider width={200} style={{ position: "fixed", left: 0 }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
      >
        <Menu.Item key="1" icon={<UserOutlined />}>
          Profile
        </Menu.Item>
        <Menu.Item key="2" icon={<AreaChartOutlined />}>
          Stats
        </Menu.Item>
        <SubMenu key="sub2" icon={<BookOutlined />} title="Notebook">
          <Menu.Item key="3">Notebook 1</Menu.Item>
          <Menu.Item key="4">Notebook 2</Menu.Item>
          {/* Add more notebooks here */}
        </SubMenu>
        <Menu.Item key="5" icon={<FileTextOutlined />}>
          Reports
        </Menu.Item>
        <Menu.Item key="6" icon={<QuestionCircleOutlined />}>
          User Guide
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
