import React from "react";
import { UserOutlined, RobotOutlined } from "@ant-design/icons";
import { List } from "antd";
import UserConversation from "./UserConversation";
import AIConversation from "./AIConversation";

const Conversation = ({ chatData }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={chatData}
      style={{
        padding: "16px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {chatData.map((item) => (
        <List.Item
          key={item.id}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {item.type === "human" ? (
            <UserConversation item={item} />
          ) : (
            <AIConversation item={item} />
          )}
        </List.Item>
      ))}
    </List>
  );
};

export default Conversation;
