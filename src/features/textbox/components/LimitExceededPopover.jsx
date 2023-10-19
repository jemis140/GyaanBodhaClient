import React from "react";
import { Popover, Button } from "antd";

const LimitExceededPopover = () => {
  const content = (
    <div>
      <p>You have exceeded the question/summary limit.</p>
      <p>Please try again later or contact support.</p>
    </div>
  );

  return (
    <Popover content={content} title="Limit Exceeded" trigger="click">
      <Button type="danger">Limit Exceeded</Button>
    </Popover>
  );
};

export default LimitExceededPopover;
