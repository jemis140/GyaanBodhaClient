import React from "react";
import TopMenu from "../../Dashboard/TopMenu";
import Sidebar from "../../Dashboard/Sidebar";

const MasterLayout = ({ children }) => {
  return (
    <>
      <TopMenu />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    </>
  );
};

export default MasterLayout;
