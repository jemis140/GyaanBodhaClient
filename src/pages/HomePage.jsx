import React, { useState, useEffect } from "react";
import { Layout, Row, Col } from "antd";
import Sidebar from "../components/Dashboard/Sidebar";
import Tabs from "../components/Dashboard/Tabs";
import TopMenu from "../components/Dashboard/TopMenu";
import ProtectedRoute from "../utils/PrivateRoute";
import { auth } from "../firebase";

const { Content } = Layout;

const HomePage = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Firebase authentication listener to update the currentUser state
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));

    if (storedUser) {
      setCurrentUser(storedUser);
    }

    // Firebase authentication listener to update the currentUser state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        setCurrentUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user)); // Store user in localStorage
      } else {
        // No user is signed in.
        setCurrentUser(null);
        localStorage.removeItem("currentUser"); // Remove user from localStorage on logout
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
      <TopMenu currentUser={currentUser} />
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
