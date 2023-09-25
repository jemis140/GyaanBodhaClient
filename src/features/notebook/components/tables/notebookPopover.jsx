import React, { useState } from "react";
import { Form, Input, Button } from "antd";

const NotebookPopoverForm = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      // Submit the form values to create a new notebook
      await onSubmit(values);
      form.resetFields();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item
        name="name"
        label="Notebook Name"
        rules={[{ required: true, message: "Please enter a notebook name" }]}
      >
        <Input placeholder="Enter the notebook name" />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea placeholder="Enter a description" />
      </Form.Item>

      <Form.Item
        name="tags"
        label="Tags"
        rules={[{ required: true, message: "Please enter tags" }]}
      >
        <Input placeholder="Enter tags (e.g., education, research)" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create Notebook
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NotebookPopoverForm;
