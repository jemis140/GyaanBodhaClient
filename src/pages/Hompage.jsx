import React from "react";
import { Layout, Row, Col } from "antd";
import Sidebar from "../components/Dashboard/Sidebar";
import Tabs from "../components/Dashboard/Tabs";
import TopMenu from "../components/Dashboard/TopMenu";

const { Content } = Layout;

const HomePage = () => {
  return (
    <>
      <TopMenu />
      <Layout style={{ marginLeft: "0", transition: "margin 0.3s" }}>
        <Content>
          <Row>
            <Col span={1}>
              <Sidebar />
            </Col>
            <Col span={23}>
              <Tabs />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default HomePage;
