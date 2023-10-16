import React, { useState } from "react";
import { Input, Checkbox, Button } from "antd";

const { TextArea } = Input;

const NotePopover = ({ onNoteSubmit }) => {
  const [note, setNote] = useState("");
  const [isImportant, setIsImportant] = useState(false);

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleIsImportantChange = (e) => {
    setIsImportant(e.target.checked);
  };

  const handleSubmit = () => {
    onNoteSubmit(note, isImportant);
    setNote("");
    setIsImportant(false);
  };

  return (
    <div style={{ width: "200px" }}>
      <TextArea
        placeholder="Enter your note"
        value={note}
        onChange={handleNoteChange}
        autoSize={{ minRows: 3, maxRows: 6 }}
      />
      <Checkbox checked={isImportant} onChange={handleIsImportantChange}>
        Important
      </Checkbox>
      <Button type="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default NotePopover;
