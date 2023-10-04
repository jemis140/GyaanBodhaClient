import React, { useState } from "react";
import { Form, Input, Button, message, Radio } from "antd";
import { createNotebook } from "../../api/notebookAPI";

const modules = ["PDF", "Youtube", "Article", "Text", "Euclid"]; // Available module options

const NotebookForm = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [module, setModule] = useState(""); // Add module state

  const handleFinish = async () => {
    setLoading(true);
    try {
      const response = await createNotebook(name, description, tags, module);

      if (response) {
        setName("");
        setDescription("");
        setTags("");
        setModule("");
        message.success("Notebook created successfully!");
      }
    } catch (error) {
      message.error("Error creating notebook:", error.message);
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

      {/* Change module input to a radio group */}
      <Form.Item
        style={{ display: "flex", flexDirection: "column" }}
        name="module"
        label="Module"
      >
        <Radio.Group onChange={(e) => setModule(e.target.value)} value={module}>
          {modules.map((option) => (
            <Radio key={option} value={option}>
              {option}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create Notebook
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NotebookForm;
