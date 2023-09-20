import React from "react";
import { Collapse } from "antd";
import {
  FilePdfOutlined,
  YoutubeOutlined,
  FileTextOutlined,
  ReadOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Panel } = Collapse;

const items = [
  {
    key: "1",
    label: (
      <span>
        <FilePdfOutlined /> Multiple PDF
      </span>
    ),
  },
  {
    key: "2",
    label: (
      <span>
        <YoutubeOutlined /> YouTube Video
      </span>
    ),
  },
  {
    key: "3",
    label: (
      <span>
        <FileTextOutlined /> Article Summary
      </span>
    ),
  },
  {
    key: "4",
    label: (
      <span>
        <ReadOutlined /> Text Summary
      </span>
    ),
  },
  {
    key: "5",
    label: (
      <span>
        <SearchOutlined /> Investigation
      </span>
    ),
  },
];

const AccordionComponent = () => (
  <Collapse accordion>
    {items.map((item) => (
      <Panel header={item.label} key={item.key}>
        {/* Content for {item.label} */}
      </Panel>
    ))}
  </Collapse>
);

export default AccordionComponent;
