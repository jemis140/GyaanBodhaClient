import React from "react";
import { Space, Typography } from "antd";
import { MODULES } from "../../../constants/moduleConstants";

const { Text } = Typography;
const { Title } = Typography;

const Description = ({ moduleType }) => {
  const { icon, heading, description } = MODULES[moduleType];

  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
      {/* Icon */}
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        {icon}
      </div>

      {/* Heading and Description */}
      <div>
        <div style={{ marginBottom: "5px" }}>
          <h2 style={{ marginBottom: "5px" }}>{heading}</h2>
        </div>
        <div>
          <h3>{description}</h3>
        </div>
      </div>
    </div>
  );
};
export default Description;
