import React, { useState } from "react";
import { Card, Tabs } from "antd";
import { FilePdfOutlined, FileTextOutlined } from "@ant-design/icons";
import NotebookTableTab from "./tables/NotebookTable";
import ReportTableTab from "./tables/ReportsTable";

const { TabPane } = Tabs;

const NotebookTabs = () => {
  const [value, setValue] = useState("notebook");

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ padding: "20px", marginTop: "60px", marginLeft: "60px" }}>
      <Card
        title={
          <Tabs activeKey={value} onChange={handleChange}>
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
        }
        style={{
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      >
        {/* Content goes here */}
      </Card>
    </div>
  );
};

export default NotebookTabs;
