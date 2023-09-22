import React from "react";
import { Space, Typography } from "antd";
import { MODULES } from "../../../constants/moduleConstants";

const { Text } = Typography;
const { Title } = Typography;

const Description = ({ moduleType }) => {
  const { icon, heading, description } = MODULES[moduleType];

  const gradientStyle = {
    background: `linear-gradient(to right, #9C27B0, #FF9800)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

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
      <div style={{ margin: "5px" }} margin>
        <div>
          <h2 style={gradientStyle}>{heading}</h2>
        </div>
        <div>
          <h3 style={gradientStyle}>{description}</h3>
        </div>
      </div>
    </div>
  );
};
export default Description;
