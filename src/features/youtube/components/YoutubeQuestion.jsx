import React from "react";
import { Input, Button } from "antd";

const YoutubeQuestionInput = ({ question, setQuestion, onAsk }) => {
  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  return (
    <div>
      <Input
        placeholder="Enter your question..."
        value={question}
        onChange={handleQuestionChange}
        onPressEnter={onAsk}
        style={{ marginRight: "10px" }}
      />
      <Button type="primary" onClick={onAsk}>
        {" "}
        {/* Use the provided onAsk callback */}
        Ask
      </Button>
    </div>
  );
};

export default YoutubeQuestionInput;
