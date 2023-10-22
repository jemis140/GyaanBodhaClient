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
          margin: "10px",
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
          {/* Summarize Button */}
          <GradientButton
            label="Summarize"
            onClick={handleTextSubmit}
            style={{
              fontSize: "14px",
              padding: "6px 12px",
              background: "linear-gradient(to bottom, #502f73, #46287a)",
              color: "#fff",
              borderRadius: "4px",
              marginRight: "5px",
            }}
          />
          <Col>
            <GenerateReport
              style={{
                padding: "6px 12px",
                marginLeft: "5px", // Increase the spacing between buttons
                borderRadius: "4px",
              }}
              chatData={chatData}
            />
          </Col>
          {/* Generate Report Button */}
        </Row>
      </Card>
    </div>
  );
};

export default TextInput;
