import React, { useState } from "react";
import { Form, Input, Button, message, Select } from "antd";
import { createNotebook } from "../../api/notebookAPI";

const { Option } = Select;

const modules = ["PDF", "Youtube", "Article", "Text", "Euclid"]; // Available module options

const NotebookPopoverForm = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [module, setModule] = useState(""); // Add module state

  const handleFinish = async () => {
    setLoading(true);
    try {
      await createNotebook(name, description, tags, module);
      setName("");
      setDescription("");
      setTags("");
      setModule("");
      message.success("Notebook created successfully!");
    } catch (error) {
      console.error("Error creating notebook:", error.message);
      message.error("Failed to create notebook.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onFinish={handleFinish} layout="vertical">
      <Form.Item
        name="name"
        label="Notebook Name"
        rules={[{ required: true, message: "Please enter a notebook name" }]}
      >
        <Input
          placeholder="Enter the notebook name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea
          placeholder="Enter a description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="tags"
        label="Tags"
        rules={[{ required: true, message: "Please enter tags" }]}
      >
        <Input
          placeholder="Enter tags (e.g., education, research)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </Form.Item>

      {/* Change module input to a dropdown */}
      <Form.Item name="module" label="Module">
        <Select
          placeholder="Select a module"
          value={module}
          onChange={(value) => setModule(value)}
        >
          {modules.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
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
