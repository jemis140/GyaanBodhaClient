import React, { useState } from "react";
import { FilePdfOutlined, FileTextOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import NotebookTableTab from "./tables/NotebookTable";
import ReportTableTab from "./tables/ReportsTable";
import MasterLayout from "../../../components/common/layout/MasterLayput";

const { TabPane } = Tabs;

const NotebookTabs = () => {
  const [value, setValue] = useState("notebook");

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div
      style={{
        margin: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Tabs
        activeKey={value}
        onChange={handleChange}
        tabBarStyle={{
          width: "100%",
        }}
        style={{ width: "100%" }}
      >
        <TabPane
          style={{
            display: "flex",
            justifyContent: "flex-start",
          }}
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
  );
};

export default NotebookTabs;
