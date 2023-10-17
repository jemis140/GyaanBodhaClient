import React, { useState } from "react";
import { Input, Button } from "antd";
import { addNoteToFirebase } from "../../../utils/firebaseUtils";

const { TextArea } = Input;

const NotePopover = ({ onNoteSubmit, chatItemId }) => {
  const [note, setNote] = useState("");

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleSubmit = () => {
    addNoteToFirebase(chatItemId, note);
    onNoteSubmit(note);
    setNote("");
  };

  return (
    <div style={{ width: "200px" }}>
      <TextArea
        placeholder="Enter your note"
        value={note}
        onChange={handleNoteChange}
        autoSize={{ minRows: 3, maxRows: 6 }}
      />
      <Button type="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default NotePopover;
