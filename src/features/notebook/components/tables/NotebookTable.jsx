import React, { useState } from "react";
import { Table, Input, Button, Popover, Row } from "antd";
import NotebookPopoverForm from "./notebookPopover";

const { Search } = Input;

const NotebookTableTab = () => {
  const [notebooks, setNotebooks] = useState([]);
  const [visible, setVisible] = useState(false);

  const dummyNotebooks = [
    { key: 1, name: "Notebook 1", createdAt: "2023-09-25", tags: "Education" },
    { key: 2, name: "Notebook 2", createdAt: "2023-09-26", tags: "Research" },
    // Add more dummy data as needed
  ];
  const columns = [
    {
      title: "Notebook Name",
      dataIndex: "name",
      key: "name",
      editable: true, // Enable editing for this column
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => {
        const editable = isEditing(record);

        return (
          <Row style={{ display: "flex" }}>
            {editable ? (
              <span>
                <Button type="primary" onClick={() => save(record.key)}>
                  Save
                </Button>
                <Button onClick={cancel}>Cancel</Button>
              </span>
            ) : (
              <Button stylesonClick={() => edit(record)}>Edit</Button>
            )}
            <Button
              style={{ marginLeft: "5px" }}
              onClick={() => handleDeleteNotebook(record.key)}
              danger
            >
              Delete
            </Button>
          </Row>
        );
      },
    },
  ];

  const handleCreateNotebook = (notebookData) => {
    // Handle notebook creation logic here
    console.log("Creating notebook:", notebookData);
    // Update the state with the new notebook
    setNotebooks([...notebooks, notebookData]);
    setVisible(false);
  };

  const isEditing = (record) => record.key === editingKey;
  const [editingKey, setEditingKey] = useState("");

  const edit = (record) => {
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = (key) => {
    const newData = [...notebooks];
    const index = newData.findIndex((item) => key === item.key);

    if (index > -1) {
      const item = newData[index];
      // Update the notebook name in the data
      // For now, let's assume the input field for editing is in a form with "editedName" field
      const editedName = document.getElementById(`editedName-${key}`).value;
      newData.splice(index, 1, { ...item, name: editedName });
      setNotebooks(newData);
      setEditingKey("");
    } else {
      setEditingKey("");
    }
  };

  const handleDeleteNotebook = (key) => {
    setNotebooks(notebooks.filter((notebook) => notebook.key !== key));
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Popover
          title="Create a New Notebook"
          trigger="click"
          content={<NotebookPopoverForm onSubmit={handleCreateNotebook} />}
        >
          <Button type="primary">Create New Notebook</Button>
        </Popover>
        <Search
          placeholder="Search notebook name"
          onSearch={(value) => console.log(value)}
          style={{ width: 200, marginLeft: 16 }}
        />
      </div>
      <Table
        dataSource={notebooks}
        columns={columns}
        bordered
        size="small"
        pagination={{ pageSize: 10 }}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default NotebookTableTab;
