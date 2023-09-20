import React from "react";
import { Layout, Row, Col } from "antd";
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
        <Layout>
          <Content>
            <Tabs />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Homepage;
