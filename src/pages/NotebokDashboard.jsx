import React from "react";
import DashboardTabs from "../features/notebook/components/DashboardNotebook";
import MasterLayout from "../components/common/layout/MasterLayput";
import NotebookTableTab from "../features/notebook/components/tables/NotebookTable";
import NotebookTabs from "../features/notebook/components/DashboardNotebook";

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
      <NotebookTabs />
    </div>
  );
};

export default Dashboard;
