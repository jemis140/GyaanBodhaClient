import React, { useState } from "react";
import { Button, Col, List, message, Row, Upload } from "antd";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";
const { Dragger } = Upload;

const UploadDoc = ({ setFiles }) => {
  const [fileList, setFileList] = useState([]);

  const handleUploadChange = (info) => {
    const newFileList = [...info.fileList];
    setFiles(newFileList);
    setFileList(newFileList);
    // if (info.file.status === "done") {
    //   message.success(`${info.file.name} file uploaded successfully.`);
    // } else if (info.file.status === "error") {
    //   message.error(`${info.file.name} file upload failed.`);
    // }
  };

  const handleFileRemove = (file) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFiles(newFileList);
    setFileList(newFileList);
    message.success(`${file.name} file removed.`);
  };

  const beforeUpload = (file) => {
    const isPDF = file.type === "application/pdf";
    if (!isPDF) {
      message.error("You can only upload PDF files!");
    }
    return isPDF;
  };

  const isFileListEmpty = fileList.length === 0;

  return (
    <div style={{ justifyContent: "space-evenly" }}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Dragger
            multiple={true}
            beforeUpload={beforeUpload}
            fileList={fileList}
            onChange={handleUploadChange}
            onRemove={handleFileRemove}
            style={{ width: "100%" }}
            showUploadList={false}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag PDF file to this area to upload
            </p>
          </Dragger>
        </Col>

        {!isFileListEmpty && (
          <Col span={12} style={{ maxHeight: "300px", overflowY: "auto" }}>
            <List
              dataSource={fileList}
              renderItem={(file) => (
                <List.Item key={file.uid}>
                  {file.name}
                  <Button
                    type="link"
                    icon={<DeleteOutlined />}
                    onClick={() => handleFileRemove(file)}
                  />
                </List.Item>
              )}
            />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default UploadDoc;
