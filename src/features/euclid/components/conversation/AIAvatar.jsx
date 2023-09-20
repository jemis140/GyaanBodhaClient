import { Avatar, Space, Typography } from "antd";
import { RobotOutlined } from "@ant-design/icons";

const AIAvatar = () => {
  const { Text } = Typography;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: "50%",
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
  );
};

export default AIAvatar;
