import React, { useState } from "react";
import { Input, Card, Row, Col } from "antd";
import GradientButton from "../../../components/common/general/Button";
import Description from "../../../components/common/data-display/Desciption";
import GenerateReport from "../../../components/common/data/GenerateReport";

const { TextArea } = Input;

const TextInput = ({ onTextSubmit, chatData }) => {
  const [text, setText] = useState("");

  const handleTextChange = (e) => {
    const newText = e.target.value.trim();
    setText(newText);
  };

  const handleTextSubmit = () => {
    const userId = localStorage.getItem("userId");
    onTextSubmit(text, userId);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
    >
      <Card
        style={{
          background: "linear-gradient(to right, #ffffff, #f0f0f0)",
          boxShadow: "0 4px 8px rgba(0, 0.1, 0.1, 0.1)",
          padding: "20px",
          margin: "5px",
          borderRadius: "8px",
        }}
      >
        {/* Description */}
        <Description moduleType="TEXT_SUMMARY" />

        {/* Text Input */}
        <TextArea
          placeholder="Enter text here..."
          value={text}
          onChange={handleTextChange}
          autoSize={{ minRows: 7, maxRows: 20 }}
          style={{ width: "100%" }}
        />

        <Row
          style={{ marginTop: "20px", display: "flex", alignItems: "center" }}
        >
          <Col style={{ marginRight: "5px" }}>
            <GradientButton
              label="Summarize"
              onClick={handleTextSubmit}
              style={{
                fontSize: "14px",
                padding: "6px 12px",
                background: "linear-gradient(to bottom, #502f73, #46287a)",
                color: "#fff",
                borderRadius: "4px",
                width: "100%", // Ensure the button takes full width on small screens
              }}
            />
          </Col>
          <Col style={{ margin: "5px" }}>
            <GenerateReport chatData={chatData} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default TextInput;
