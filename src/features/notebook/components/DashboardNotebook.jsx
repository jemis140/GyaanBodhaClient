import React, { useState } from "react";
import { FilePdfOutlined, FileTextOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import NotebookTableTab from "./tables/NotebookTable";
import ReportTableTab from "./tables/ReportsTable";

const { TabPane } = Tabs;

const DashboardTabs = () => {
  const [value, setValue] = useState("notebook");

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div
        style={{
          margin: "64px",
          padding: "16px",
          // Adjust height based on your layout, // Hide overflow
        }}
      >
        <Tabs
          activeKey={value}
          onChange={handleChange}
          tabBarStyle={{ marginLeft: "10px", position: "sticky", top: 0 }}
        >
          <TabPane
            tab={
              <span>
                <FilePdfOutlined />
                Notebooks
              </span>
            }
            key="notebook"
          >
            {value === "notebook" && <NotebookTableTab />}
          </TabPane>
          <TabPane
            tab={
              <span>
                <FileTextOutlined />
                Reports
              </span>
            }
            key="report"
          >
            {value === "report" && <ReportTableTab />}
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default DashboardTabs;
