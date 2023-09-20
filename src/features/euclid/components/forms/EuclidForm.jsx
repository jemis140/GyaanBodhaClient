import React, { useState } from "react";
import { Input, Button, Row, Col } from "antd";
import ArticleURLInput from "./articleForm";
import UploadDoc from "./UploadDoc";
import TextForm from "./TextForm";
import GradientButton from "../../../../components/common/general/Button";

const EuclidInput = ({ onFormSubmit }) => {
  const [url, setUrl] = useState("");
  const [files, setFiles] = useState([]);
  const [text, setText] = useState("");

  const handleFormSubmit = () => {
    onFormSubmit(files, url, text);
  };

  return (
    <div>
      <div style={{ marginTop: "20px" }}>
        <UploadDoc setFiles={setFiles} style={{ marginBottom: "15px" }} />
        <ArticleURLInput setUrl={setUrl} />
        <TextForm setText={setText} />
      </div>
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
