import React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const CustomAvatar = () => {
  return (
    <div style={{ textAlign: "center", margin: "16px 0" }}>
      <Avatar
        size={24}
        icon={<UserOutlined />}
        style={{
          backgroundColor: "#1890ff", // Primary color
          fontSize: "28px",
          marginBottom: "8px",
        }}
      />
      <p style={{ color: "#333", fontSize: "16px", fontWeight: "bold" }}>
        John Doe
      </p>
    </div>
  );
};

export default CustomAvatar;
