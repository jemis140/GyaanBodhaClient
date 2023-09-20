import React from "react";
import { Button } from "antd";
import { getConversationChain } from "../api/PdfAPI";

const ProcessFilesButton = ({ files }) => {
  const handleProcessClick = async () => {
    try {
      const response = await getConversationChain(files);
      // Handle the response, e.g., setVectorStore or any other logic
    } catch (error) {
      console.error("Generate Vector Store Error:", error);
    }
  };

  return (
    <Button
      type="primary"
      onClick={handleProcessClick}
      style={{
        width: "25%",
        fontSize: "14px",
        padding: "6px 12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Process
    </Button>
  );
};

export default ProcessFilesButton;
