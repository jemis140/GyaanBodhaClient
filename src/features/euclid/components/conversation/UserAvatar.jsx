import { Avatar, Space, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

const UserAvatar = () => {
  const { Text } = Typography;

  return (
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
          <Avatar size={32} icon={<UserOutlined />} />
        </div>
        <Text strong type="secondary">
          user
        </Text>
      </Space>
    </div>
  );
};

export default UserAvatar;
