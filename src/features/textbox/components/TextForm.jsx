import React, { useState } from "react";
import { Input, Button, Typography, Col, Row } from "antd";

const { TextArea } = Input;
const { Text } = Typography;

const TextInput = ({ onTextSubmit }) => {
  const [text, setText] = useState("");

  const handleTextChange = (e) => {
    const newText = e.target.value.trim(); // Trim extra spaces and new lines
    setText(newText);
  };

  const handleTextSubmit = () => {
    onTextSubmit(text);
  };

  return (
    <Col
      gutter={[16, 16]}
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Row xs={24} sm={20} md={20} lg={20}>
        <TextArea
          placeholder="Enter text here ..."
          value={text}
          onChange={handleTextChange}
          autoSize={{ minRows: 7, maxRows: 20 }}
          style={{ width: "100%" }}
        />
      </Row>
      <Row
        xs={24}
        sm={4}
        md={4}
        lg={4}
        style={{
          marginTop: "20px",
        }}
      >
        <Button
          type="primary"
          onClick={handleTextSubmit}
          style={{
            width: "10%",
            fontSize: "14px",
            padding: "6px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#502f73", // Darker shade of purple
            color: "#fff", // White text color
            overflow: "hidden",
          }}
        >
          Summarize
        </Button>
      </Row>
    </Col>
  );
};

export default TextInput;
