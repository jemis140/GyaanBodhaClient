import React from "react";
import { List, Avatar, Typography, Space, Popover, Button } from "antd";
import {
  RobotOutlined,
  CopyOutlined,
  PlusOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import NotePopover from "../../../components/common/NotePopover";

const { Text } = Typography;

const TextSummary = ({ chatData }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={chatData}
      style={{
        backgroundColor: "#aa97cc", // Lighter purple background
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        padding: "16px",
        marginTop: "30px",
        marginBottom: "20px",
        width: "80%",
        margin: "0 auto", // Center the component
      }}
      renderItem={(item) => (
        <List.Item
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Space size={12} alignItems="center" direction="vertical">
              <div
                style={{
                  background: "linear-gradient(to bottom, #502f73, #46287a)",
                  borderRadius: "50%", // Make it a circle
                  padding: "3px", // Adjust the padding as needed
                }}
              >
                <Avatar size={32} icon={<RobotOutlined />} />
              </div>
            </Space>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              flex: 1,
            }}
          >
            <div
              style={{
                backgroundColor: "#f5f7fa", // Even lighter purple or grayish
                color: "#111", // Dark grayish text for good contrast
                padding: "8px 12px",
                borderRadius: "8px",
                wordWrap: "break-word",
                fontFamily: "Arial, sans-serif",
                fontSize: "14px",
                marginBottom: "8px", // Add some space between text and buttons
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between", // Align buttons horizontally
              }}
            >
              {item.content}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Popover content="Copy Text">
                  <Button type="text" icon={<CopyOutlined />} />
                </Popover>
                <Popover content="Take Notes">
                  <Popover
                    content={
                      <NotePopover
                        onNoteSubmit={(note, isImportant) => {
                          /* Handle note submission here */
                        }}
                      />
                    }
                    trigger="click"
                  >
                    <Button type="text" icon={<PlusOutlined />} />
                  </Popover>
                </Popover>
                <Popover>
                  <Button type="text" icon={<LikeOutlined />} />
                </Popover>
              </div>
            </div>
          </div>
        </List.Item>
      )}
    />
  );
};

export default TextSummary;
