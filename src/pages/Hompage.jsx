import React from "react";
import { Layout, Row, Col } from "antd";
import Sidebar from "../components/Dashboard/Sidebar";
import Tabs from "../components/Dashboard/Tabs";
import TopMenu from "../components/Dashboard/TopMenu";

const { Content } = Layout;

const Homepage = () => {
  return (
    <Layout>
      <Row style={{ position: "fixed", width: "100%", marginBottom: "64px" }}>
        <TopMenu />
      </Row>
      <Row>
        <Row style={{ width: "100%", height: "100vh", marginTop: "64px" }}>
          <Col span={4}>
            <Sidebar />
          </Col>
          <Col span={20}>
            <Tabs />
          </Col>
        </Row>
      </Row>
    </Layout>
  );
};

export default Homepage;
