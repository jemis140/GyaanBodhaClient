import React, { useState } from "react";
import { Input, Button, Typography, Col, Row } from "antd";

const { TextArea } = Input;
const { Text } = Typography;

const TextInput = ({ setText }) => {
  const handleTextChange = (e) => {
    const newText = e.target.value.trim(); // Trim extra spaces and new lines
    setText(newText);
  };

  return (
    <Col
      gutter={[16, 16]}
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        marginTop: "20px",
      }}
    >
      <Row xs={24} sm={20} md={20} lg={20}>
        <TextArea
          placeholder="Enter text here ..."
          onChange={handleTextChange}
          autoSize={{ minRows: 7, maxRows: 20 }}
          style={{ width: "100%" }}
        />
      </Row>
    </Col>
  );
};

export default TextInput;
