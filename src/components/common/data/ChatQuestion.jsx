import React, { useState } from "react";
import { Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import "./ChatQuestion.css";

const ChatInput = ({ question, setQuestion, onAsk }) => {
  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSend = () => {
    // Handle sending the question (e.g., send to a chatbot)
    console.log("Question:", question);
    // Clear the input field after sending the question
    setQuestion("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chat-input-container">
      <Input
        value={question}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        onPressEnter={onAsk}
        placeholder="Type your question here..."
        className="chat-input"
      />
      <Button
        style={{ backgroundColor: "ffffff" }}
        className="chat-send-button"
        onClick={onAsk}
        icon={<SendOutlined />}
      />
    </div>
  );
};

export default ChatInput;
