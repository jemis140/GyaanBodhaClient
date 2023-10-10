import React, { useEffect, useState } from "react";
import { Layout, Row, Col } from "antd";
import Sidebar from "../components/Dashboard/Sidebar";
import Tabs from "../components/Dashboard/Tabs";
import TopMenu from "../components/Dashboard/TopMenu";
import { getCurrentUser } from "../components/authentication/api/authenticationAPI";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/common/general/Spinner";
import {
  startSessionTimer,
  resetSessionTimer,
  updateSessionTimestamp,
} from "../session/sessionManager"; // Update the import path

const { Content } = Layout;

const Homepage = () => {
  // useEffect(() => {
  //   const checkToken = async () => {
  //     try {
  //       const { isUserSignedIn } = await getCurrentUser();

  //       if (isUserSignedIn) {
  //         // Reset session timer and start it
  //         resetSessionTimer();
  //         startSessionTimer();

  //         // Update session timestamp on user activity
  //         window.addEventListener("mousemove", updateSessionTimestamp);
  //         window.addEventListener("keydown", updateSessionTimestamp);

  //         return () => {
  //           window.removeEventListener("mousemove", updateSessionTimestamp);
  //           window.removeEventListener("keydown", updateSessionTimestamp);
  //         };
  //       }
  //     } catch (error) {
  //       console.error("Error checking JWT token:", error);
  //       navigate("/login");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkToken();
  // }, [navigate]);

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

export default Homepage;
