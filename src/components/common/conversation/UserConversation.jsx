import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space, Typography } from "antd";
import TextArea from "./TextArea";

const UserConversation = ({ item }) => {
  const { Text } = Typography;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start", // Align the items to the bottom
        width: "100%",
      }}
    >
      {/* User Avatar */}
      <div style={{ marginRight: "12px" }}>
        <Space size={12} align="center" direction="vertical">
          <div
            style={{
              background: "linear-gradient(to bottom, #502f73, #95411e)",
              borderRadius: "50%",
              padding: "3px",
            }}
          >
            <Avatar size={32} icon={<UserOutlined />} />
          </div>
        </Space>
      </div>

      {/* Text Area */}
      <TextArea item={item} />
    </div>
  );
};

export default UserConversation;
