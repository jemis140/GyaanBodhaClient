import React from "react";
import ResearchAssistantPopover from "./ResearchAssistantPopover";

import { Popover, Button, message } from "antd";
const TextArea = ({ item }) => {
  const gradientBorder = {
    background: "linear-gradient(to bottom, #502f73, #95411e)",
    borderRadius: "px", // Adjust as needed
    border: "1px solid ", // Add a transparent border
  };

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
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        width: "100%",
        justifyContent: "space-between", // Add this to align tools to the right
      }}
    >
      <div
        style={{
          ...gradientBorder,
          background: "#ffffff", // Even lighter purple or grayish
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
      </div>
      <div style={{ marginLeft: "5px" }}>
        {item.type === "human" ? (
          <div />
        ) : (
          <ResearchAssistantPopover
            onCopyText={handleCopyText}
            onTakeNotes={handleTakeNotes}
            onDelete={handleDelete}
            item={item}
          />
        )}
      </div>
    </div>
  );
};

export default TextArea;
