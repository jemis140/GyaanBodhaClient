import React from "react";
import NotebookTableTab from "../features/notebook/components/tables/NotebookTable";
import ReportTableTab from "../features/notebook/components/tables/ReportsTable"; // Update the import path accordingly

const Dashboard = () => {
  return (
    <>
      <h3>Hello Notebook Dashboard</h3>
      <div>
        <h4>Notebooks</h4>
        <NotebookTableTab />
      </div>
      <div style={{ marginTop: 20 }}>
        <h4>Reports</h4>
        <ReportTableTab />
      </div>
    </>
  );
};

export default Dashboard;
