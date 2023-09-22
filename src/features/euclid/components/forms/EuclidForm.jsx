import React, { useState } from "react";
import ArticleURLInput from "./articleForm";
import { Typography } from "antd";
import UploadDoc from "./UploadDoc";
import TextForm from "./TextForm";
import GradientButton from "../../../../components/common/general/Button";
import ChatInput from "../../../../components/common/data/ChatQuestion";

const gradientStyle = {
  background: `linear-gradient(to right, #9C27B0, #FF9800)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const EuclidInput = ({ onFormSubmit }) => {
  const [url, setUrl] = useState("");
  const [files, setFiles] = useState([]);
  const [text, setText] = useState("");

  const handleFormSubmit = () => {
    onFormSubmit(files, url, text);
  };

  return (
    <div style={{ marginLeft: "10px" }}>
      <h3 style={gradientStyle}> Upload Document here </h3>
      <UploadDoc setFiles={setFiles} style={{ marginBottom: "15px" }} />
      <h3 style={gradientStyle}> Enter Article URL </h3>
      <ArticleURLInput setUrl={setUrl} />
      <h3 style={gradientStyle}> Enter copied text here </h3>
      <TextForm setText={setText} />

      <div
        style={{
          marginTop: "15px",
        }}
      >
        <GradientButton label="Submit" onClick={handleFormSubmit} />
      </div>
    </div>
  );
};

export default EuclidInput;
