import React from "react";
import { Button } from "antd";
import "../../../App.css";

const GradientButton = ({ label, onClick, width }) => {
  const buttonStyle = {
    fontSize: "14px",
    width: width,
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    transition: "0.2s",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "5px",
    background:
      "linear-gradient(to right, #4d2882, #b74400)" /* Darker shade of purple to darker shade of orange */,
    color: "#fff",
  };

  const hoverStyles = {
    background: "linear-gradient(to right, #8b4de8, #ff6c00)", // Hover background (normal shades of purple and orange)
    color: "#fff",
    borderRadius: "6px", // White text color on hover
  };

  return (
    <div>
      <Button
        style={buttonStyle}
        onClick={onClick}
        onMouseEnter={() => {
          // Apply hover styles on mouse enter
          Object.assign(buttonStyle, hoverStyles);
        }}
        onMouseLeave={() => {
          // Reset to normal styles on mouse leave
          buttonStyle.background =
            "linear-gradient(to right, #4d2882, #b74400)";
        }}
      >
        {label}
      </Button>
    </div>
  );
};

export default GradientButton;
