import React from "react";
import { Input, Button, Row, Col } from "antd";

const QuestionInput = ({ question, setQuestion, onAsk }) => {
  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  return (
    <Col
      gutter={[16, 16]}
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "10px", // Center the content horizontally
      }}
    >
      <Input
        placeholder="Enter your question..."
        value={question}
        onChange={handleQuestionChange}
        onPressEnter={onAsk}
        style={{
          marginBottom: "20px",
          width: "100%", // Make the input take the full width
        }}
      />
      <Button
        type="primary"
        style={{
          width: "10%",
          fontSize: "14px",
          padding: "6px 12px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#502f73", // Make the button take the full width
        }}
        onClick={onAsk}
      >
        Ask
      </Button>
    </Col>
  );
};

export default QuestionInput;
