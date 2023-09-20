import React, { useState } from "react";
import ArticleURLInput from "./articleForm";
import { Card, Row, Col } from "antd";
import UploadDoc from "./UploadDoc";
import TextForm from "./TextForm";
import GradientButton from "../../../../components/common/general/Button";
import ChatInput from "../../../../components/common/data/ChatQuestion";

const EuclidInput = ({ onFormSubmit }) => {
  const [url, setUrl] = useState("");
  const [files, setFiles] = useState([]);
  const [text, setText] = useState("");

  const handleFormSubmit = () => {
    onFormSubmit(files, url, text);
  };

  return (
    <div>
      <UploadDoc setFiles={setFiles} style={{ marginBottom: "15px" }} />
      <ArticleURLInput setUrl={setUrl} />
      <TextForm setText={setText} />

      <div
        style={{
          marginLeft: "20px",
        }}
      >
        <GradientButton label="Submit" onClick={handleFormSubmit} />
      </div>
    </div>
  );
};

export default EuclidInput;
