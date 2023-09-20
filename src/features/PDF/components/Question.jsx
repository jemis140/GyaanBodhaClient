import React from "react";
import { Input, Button } from "antd";
import ChatInput from "../../../components/common/data/ChatQuestion";

const QuestionInput = ({ question, setQuestion, onAsk }) => {
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
      {/* <GradientButton label="Ask" onClick={onAsk} width="12%" />{" "} */}
      {/* Use the provided onAsk callback */}
    </div>
  );
};

export default QuestionInput;
