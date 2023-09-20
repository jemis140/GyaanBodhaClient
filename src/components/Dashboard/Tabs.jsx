import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  SearchOutlined,
  YoutubeOutlined,
  FileTextOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import PdfTab from "../../features/PDF/components/PdfTab"; // Import the PdfTab component
import YoutubeTab from "../../features/youtube/components/YoutubeTab";
import ArticleTab from "../../features/article/components/ArticleTab";
import TextTab from "../../features/textbox/components/TextTab";
import EuclidTab from "../../features/euclid/components/EuclidTab";

export default function ColorTabs() {
  const [value, setValue] = useState("pdf");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", padding: "16px" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="primary tabs example"
        variant="fullWidth"
      >
        <Tab value="pdf" label="Multiple PDF" icon={<FilePdfOutlined />} />
        <Tab value="youtube" label="YouTube Video" icon={<YoutubeOutlined />} />
        <Tab
          value="article"
          label="Article Summary"
          icon={<FileTextOutlined />}
        />
        <Tab value="text" label="Text Summary" icon={<FileTextOutlined />} />
        <Tab value="euclid" label="Euclid" icon={<SearchOutlined />} />
      </Tabs>

      {value === "pdf" && <PdfTab />}
      {value === "youtube" && <YoutubeTab />}
      {value === "article" && <ArticleTab />}
      {value === "text" && <TextTab />}
      {value === "euclid" && <EuclidTab />}
    </Box>
  );
}
