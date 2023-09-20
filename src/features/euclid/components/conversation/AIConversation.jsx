import React from "react";
import { RobotOutlined } from "@ant-design/icons";
import { Avatar, Space, Typography, Popover, Button } from "antd";
import ResearchAssistantPopover from "./ResearchAssistantPopover";
import TextArea from "./TextArea";

const AIConversation = ({ item }) => {
  const { Text } = Typography;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {/* AI Avatar */}
      <div
        style={{
          marginRight: "12px",
        }}
      >
        <Space size={12} align="center" direction="vertical">
          <div
            style={{
              background: "linear-gradient(to bottom, #502f73, #95411e)",
              borderRadius: "50%",
              padding: "3px",
            }}
          >
            <Avatar size={32} icon={<RobotOutlined />} />
          </div>
        </Space>
      </div>

      {/* Text Area */}
      <TextArea item={item} />
    </div>
  );
};

export default AIConversation;
