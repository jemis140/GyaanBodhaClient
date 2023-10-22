import React, { useState } from "react";
import ArticleURLInput from "./articleForm";
import { Typography, Row, Col } from "antd";
import UploadDoc from "./UploadDoc";
import TextForm from "./TextForm";
import GradientButton from "../../../../components/common/general/Button";
import ChatInput from "../../../../components/common/data/ChatQuestion";
import GenerateReport from "../../../../components/common/data/GeneReportConversation";

const gradientStyle = {
  background: `linear-gradient(to right, #9C27B0, #FF9800)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const EuclidInput = ({ onFormSubmit, chatData }) => {
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

      <Row style={{ marginTop: "20px", display: "flex", alignItems: "center" }}>
        <Col style={{ marginRight: "10px" }}>
          <GradientButton label="Submit" onClick={handleFormSubmit} />
        </Col>
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
      </Row>
    </div>
  );
};

export default EuclidInput;
