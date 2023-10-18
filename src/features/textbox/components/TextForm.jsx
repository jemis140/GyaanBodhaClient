import React, { useState } from "react";
import { Input, Button, Typography, Card, Row } from "antd";
import GradientButton from "../../../components/common/general/Button";
import Description from "../../../components/common/data-display/Desciption";

const { TextArea } = Input;
const { Text } = Typography;

const TextInput = ({ onTextSubmit }) => {
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
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Card
        style={{
          background: "linear-gradient(to right, #ffffff, #f0f0f0)",
          boxShadow: " 0 4px 8px rgba(0, 0.1, 0.1, 0.1)",
        }}
        bodyStyle={{
          borderColor: "linear-gradient(to left, #4d2882, #b74400)",
          border: "1px solid transparent",
          borderRadius: "8px",
          padding: "20px",
          margin: "10px",
        }}
      >
        {/* start of input section */}
        <Description moduleType="TEXT_SUMMARY" />
        <Row>
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
          <GradientButton
            label="Summarize"
            onClick={handleTextSubmit}
            style={{
              width: "10%",
              fontSize: "14px",
              padding: "6px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(to bottom, #502f73, #46287a)", // Darker shade of purple
              color: "#fff", // White text color
              overflow: "hidden",
            }}
          />
        </Row>
      </Card>
    </div>
  );
};

export default TextInput;
