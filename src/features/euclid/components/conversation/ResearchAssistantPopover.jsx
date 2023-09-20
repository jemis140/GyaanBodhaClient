import { Popover, Button } from "antd";
import { CopyOutlined, PlusOutlined, LikeOutlined } from "@ant-design/icons";

import NotePopover from "../../../../components/common/NotePopover";

const ResearchAssistantPopover = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Popover content="Copy Text">
        <Button type="text" icon={<CopyOutlined />} />
      </Popover>
      <Popover content="Take Notes">
        <Popover
          content={
            <NotePopover
              onNoteSubmit={(note, isImportant) => {
                /* Handle note submission here */
              }}
            />
          }
          trigger="click"
        >
          <Button type="text" icon={<PlusOutlined />} />
        </Popover>
      </Popover>
      <Popover>
        <Button type="text" icon={<LikeOutlined />} />
      </Popover>
    </div>
  );
};

export default ResearchAssistantPopover;
