import React from "react";
import DashboardTabs from "../features/notebook/components/DashboardNotebook";
import MasterLayout from "../components/common/layout/MasterLayput";

const Dashboard = () => {
  return (
    <div
      style={{
        display: "flex",
        margin: "15px",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <DashboardTabs />
    </div>
  );
};

export default Dashboard;
