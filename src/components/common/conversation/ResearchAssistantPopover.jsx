import React from "react";
import { Popover, Button, message } from "antd";
import { CopyOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import NotePopover from "./NotePopover";

const ResearchAssistantPopover = ({
  onCopyText,
  onTakeNotes,
  onDelete,
  item,
}) => {
  const handleDelete = () => {
    // Handle delete logic here
    message.success("Item deleted successfully");
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
            onCopyText(item.content);
          }}
        />
      </Popover>
    </div>
  );
};

export default ResearchAssistantPopover;
