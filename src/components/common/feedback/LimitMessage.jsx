import React from "react";
import { Modal, Button } from "antd";

const LimitMessage = ({ open, onClose }) => {
  return (
    <Modal
      title="Limit Exceeded"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="close" type="primary" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <p>You have exceeded the question/summary limit.</p>
      <p>Please try again later or contact support.</p>
    </Modal>
  );
};

export default LimitMessage;
