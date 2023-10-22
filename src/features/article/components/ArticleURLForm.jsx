import React, { useState } from "react";
import { Input, Button, Row, Col } from "antd";
import GradientButton from "../../../components/common/general/Button";
import GenerateReport from "../../../components/common/data/GenerateReport";

const ArticleURLInput = ({ onUrlSubmit, chatData }) => {
  const [url, setUrl] = useState("");

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleUrlSubmit = () => {
    onUrlSubmit(url);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Submit the URL when Enter key is pressed
      handleUrlSubmit();
    }
  };

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={16} md={14} lg={18}>
          <Input
            placeholder="Enter Article URL"
            value={url}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress} // Handle Enter key press
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={8} md={6} lg={3}>
          <GradientButton
            label="Summarize"
            onClick={handleUrlSubmit}
            width="90%"
          />
        </Col>
        <Col xs={24} sm={8} md={6} lg={3}>
          <GenerateReport
            style={{
              padding: "6px 12px",
              marginLeft: "5px", // Increase the spacing between buttons
              borderRadius: "4px",
            }}
            chatData={chatData}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ArticleURLInput;
