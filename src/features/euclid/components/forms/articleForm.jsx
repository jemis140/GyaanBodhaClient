import React, { useState } from "react";
import { Input, Button, Row, Col } from "antd";

const ArticleURLInput = ({ setUrl }) => {
  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };
  return (
    <div style={{ margin: "20px" }}>
      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={16} md={16} lg={24}>
          <Input placeholder="Enter Article URL" onChange={handleInputChange} />
        </Col>
      </Row>
    </div>
  );
};

export default ArticleURLInput;
