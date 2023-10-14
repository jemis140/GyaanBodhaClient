import React from "react";
import { Typography, Descriptions } from "antd";

const { Title } = Typography;

const NoConversationComponent = ({ moduleName }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <Title level={4}>
        To start a conversation please provide {moduleName} data source
      </Title>
      <Descriptions
        title="Module Information"
        bordered
        column={1}
        style={{ marginTop: "10px" }}
      >
        <Descriptions.Item label="Module Type">{moduleName}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default NoConversationComponent;
