import React from "react";
import { Input, Button } from "antd";

const YoutubeURLInput = ({ setYoutubeUrl }) => {
  const handleQuestionChange = (e) => {
    setYoutubeUrl(e.target.value);
  };

  return (
    <div>
      <Input
        placeholder="Enter your Youtube URL here..."
        onChange={handleQuestionChange}
        style={{ marginRight: "10px" }}
      />
    </div>
  );
};

export default YoutubeURLInput;
