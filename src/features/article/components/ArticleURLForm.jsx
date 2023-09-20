import React, { useState } from "react";
import { Input, Button, Row, Col } from "antd";
import GradientButton from "../../../components/common/general/Button";

const ArticleURLInput = ({ onUrlSubmit }) => {
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
        <Col xs={24} sm={8} md={10}>
          <GradientButton
            label="Summarize"
            onClick={handleUrlSubmit}
            width="30%"
          />
        </Col>
      </Row>
    </div>
  );
};

export default ArticleURLInput;
