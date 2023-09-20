import React from "react";
import { Spin } from "antd";

const Loader = () => {
  const loaderContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "30vh",
    background: "ffffff", // Gradient background
  };

  const spinStyle = {
    color: "transparent", // Make the text transparent
    backgroundImage: "linear-gradient(135deg, #5A0A75, #B25400)", // Gradient color for the spinner
    WebkitBackgroundClip: "text", // Clip text to the background area
  };

  return (
    <div style={loaderContainerStyle}>
      <Spin size="large" style={spinStyle} />
    </div>
  );
};

export default Loader;
