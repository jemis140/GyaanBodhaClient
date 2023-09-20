import React from "react";
import { Button, message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const UploadFilesButton = ({ setFiles }) => {
  const handleUploadChange = (info) => {
    if (info.file.status === "done") {
      setFiles(info.fileList);
      console.log("inside function", files);
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const uploadProps = {
    multiple: true,
    onChange: handleUploadChange,
  };

  return (
    <Upload.Dragger {...uploadProps} style={{ width: "100%" }}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag files to upload</p>
    </Upload.Dragger>
  );
};

export default UploadFilesButton;
