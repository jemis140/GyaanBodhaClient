import React from "react";
import { Popover, Button, message, Modal } from "antd";
import { CopyOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import NotePopover from "./NotePopover";

const ResearchAssistantPopover = ({ onCopyText, onTakeNotes, onDelete }) => {
  const handleDelete = () => {
    console.log("Delete functionality"); // Implement delete functionality here
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Popover content="Copy Text">
        <Button
          type="text"
          icon={<CopyOutlined />}
          onClick={() => {
            onCopyText();
          }}
        />
      </Popover>
      {onTakeNotes && ( // Only show if onTakeNotes function is provided
        <Popover content="Take Notes">
          <Popover
            content={
              <NotePopover
                onNoteSubmit={(note) => {
                  onTakeNotes(note);
                }}
              />
            }
            trigger="click"
          >
            <Button type="text" icon={<PlusOutlined />} />
          </Popover>
        </Popover>
      )}
      <Popover content="Delete">
        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete()}
        />
      </Popover>
    </div>
  );
};

export default ResearchAssistantPopover;
