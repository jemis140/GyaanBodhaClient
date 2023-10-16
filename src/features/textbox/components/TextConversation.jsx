import React from "react";
import {
  List,
  Avatar,
  Typography,
  Space,
  Popover,
  Button,
  message,
  Modal,
} from "antd";
import {
  RobotOutlined,
  CopyOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import NotePopover from "../../../components/common/NotePopover";
import { auth } from "../../../firebase"; // Import the auth object
import { remove } from "firebase/database";

const { Text } = Typography;

const TextSummary = ({ chatData }) => {
  const handleCopyText = (text) => {
    // Copy the text to the clipboard
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Notify the user that the text has been copied
        message.success("Text copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
        // Notify the user about the error
        message.error("Failed to copy text to clipboard");
      });
  };

  const handleTakeNotes = (item) => {
    // Logic to handle taking notes for the item
    // You can implement this based on your requirements
    // For example, you can open a modal to allow the user to input notes
    Modal.info({
      title: "Take Notes",
      content: (
        <div>
          <p>Write your notes here:</p>
          <NotePopover
            onNoteSubmit={(note, isImportant) => {
              // Handle note submission here
              console.log("Note:", note);
              console.log("Is Important:", isImportant);
            }}
          />
        </div>
      ),
      onOk() {},
    });
  };

  const handleDelete = (item) => {
    const userId = auth.currentUser.uid;
    const chatItemId = item.id; // Assuming there is an 'id' property in the item
    const chatItemRef = ref(
      realtimeDb,
      `users/${userId}/modules/text/${chatItemId}`
    );

    // Remove the chat item from Firebase
    remove(chatItemRef)
      .then(() => {
        message.success("Item deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting chat item:", error);
        message.error("Failed to delete the item");
      });
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={chatData}
      style={{
        backgroundColor: "#aa97cc", // Lighter purple background
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        padding: "16px",
        marginTop: "30px",
        marginBottom: "20px",
        width: "80%",
        margin: "0 auto", // Center the component
      }}
      renderItem={(item) => (
        <List.Item
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Space size={12} alignItems="center" direction="vertical">
              <div
                style={{
                  background: "linear-gradient(to bottom, #502f73, #46287a)",
                  borderRadius: "50%", // Make it a circle
                  padding: "3px", // Adjust the padding as needed
                }}
              >
                <Avatar size={32} icon={<RobotOutlined />} />
              </div>
            </Space>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              flex: 1,
            }}
          >
            <div
              style={{
                backgroundColor: "#f5f7fa", // Even lighter purple or grayish
                color: "#111", // Dark grayish text for good contrast
                padding: "8px 12px",
                borderRadius: "8px",
                wordWrap: "break-word",
                fontFamily: "Arial, sans-serif",
                fontSize: "14px",
                marginBottom: "8px", // Add some space between text and buttons
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between", // Align buttons horizontally
              }}
            >
              {item.content}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Popover content="Copy Text">
                  <Button
                    type="text"
                    icon={<CopyOutlined />}
                    onClick={() => handleCopyText(item.content)}
                  />
                </Popover>
                <Popover content="Take Notes">
                  <Button
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={() => handleTakeNotes(item)}
                  />
                </Popover>
                <Popover content="Delete">
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(item)}
                  />
                </Popover>
              </div>
            </div>
          </div>
        </List.Item>
      )}
    />
  );
};

export default TextSummary;
