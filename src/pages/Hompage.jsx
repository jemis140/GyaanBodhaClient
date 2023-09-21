// Homepage.js

import React from "react";
import { Layout } from "antd";
import Sidebar from "../components/Dashboard/Sidebar";
import Tabs from "../components/Dashboard/Tabs";
import TopMenu from "../components/Dashboard/TopMenu";

const { Content } = Layout;

const Homepage = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <TopMenu />
      <Layout>
        <Sidebar />
        <Layout style={{ marginLeft: 0, transition: "margin 0.3s" }}>
          <Content style={{ margin: "16px" }}>
            <Tabs />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Homepage;
