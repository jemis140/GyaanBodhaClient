import React from "react";
import ResearchAssistantPopover from "./ResearchAssistantPopover";
import NotePopover from "./NotePopover";

import { Popover, Button, message } from "antd";

const TextArea = ({ item }) => {
  const gradientBorder = {
    background: "linear-gradient(to bottom, #502f73, #95411e)",
    borderRadius: "px", // Adjust as needed
    border: "1px solid ", // Add a transparent border
  };

  const handleCopyText = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        message.success("Text copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
        message.error("Failed to copy text to clipboard");
      });
  };

  const handleTakeNotes = (item) => {
    Modal.info({
      title: "Take Notes",
      content: (
        <div>
          <p>Write your notes here:</p>
          <NotePopover
            onNoteSubmit={(note) => {
              console.log("Note:", note);
            }}
          />
        </div>
      ),
      onOk() {},
    });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          ...gradientBorder,
          background: "#ffffff",
          padding: "8px 12px",
          borderRadius: "8px",
          wordWrap: "break-word",
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
          marginBottom: "8px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        {item.content}
      </div>
      <div style={{ marginLeft: "5px" }}>
        {item.type === "human" ? (
          <div />
        ) : (
          <ResearchAssistantPopover
            onCopyText={() => handleCopyText(item.content)}
            onTakeNotes={() => handleTakeNotes(item)}
            onDelete={() => handleDelete(item)}
          />
        )}
      </div>
    </div>
  );
};

export default TextArea;
