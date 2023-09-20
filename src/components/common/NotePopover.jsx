// NotePopover.jsx

import React, { useState } from "react";
import { Input, Button, Checkbox } from "antd";

const NotePopover = ({ onNoteSubmit }) => {
  const [note, setNote] = useState("");
  const [isImportant, setIsImportant] = useState(false);

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setIsImportant(e.target.checked);
  };

  const handleNoteSubmit = () => {
    onNoteSubmit(note, isImportant);
    setNote("");
    setIsImportant(false);
  };

  return (
    <div>
      <Input
        placeholder="Add a note..."
        value={note}
        onChange={handleNoteChange}
        onPressEnter={handleNoteSubmit}
      />
      <Checkbox onChange={handleCheckboxChange}>Important</Checkbox>
      <Button type="primary" onClick={handleNoteSubmit}>
        Save
      </Button>
    </div>
  );
};

export default NotePopover;
