import React, { useState } from "react";
import { Tabs } from "antd";
import {
  SearchOutlined,
  YoutubeOutlined,
  FileTextOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import PdfTab from "../../features/PDF/components/PdfTab";
import YoutubeTab from "../../features/youtube/components/YoutubeTab";
import ArticleTab from "../../features/article/components/ArticleTab";
import TextTab from "../../features/textbox/components/TextTab";
import EuclidTab from "../../features/euclid/components/EuclidTab";

const { TabPane } = Tabs;

export default function ColorTabs() {
  const [value, setValue] = useState("pdf");

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div
      style={{
        padding: "16px",
        overflowY: "hidden", // Adjust height based on your layout, // Hide overflow
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
              Multiple PDF
            </span>
          }
          key="pdf"
        >
          {value === "pdf" && <PdfTab />}
        </TabPane>
        <TabPane
          tab={
            <span>
              <YoutubeOutlined />
              YouTube Video
            </span>
          }
          key="youtube"
        >
          {value === "youtube" && <YoutubeTab />}
        </TabPane>
        <TabPane
          tab={
            <span>
              <FileTextOutlined />
              Article Summary
            </span>
          }
          key="article"
        >
          {value === "article" && <ArticleTab />}
        </TabPane>
        <TabPane
          tab={
            <span>
              <FileTextOutlined />
              Text Summary
            </span>
          }
          key="text"
        >
          {value === "text" && <TextTab />}
        </TabPane>
        <TabPane
          tab={
            <span>
              <SearchOutlined />
              Euclid
            </span>
          }
          key="euclid"
        >
          {value === "euclid" && <EuclidTab />}
        </TabPane>
      </Tabs>
    </div>
  );
}
