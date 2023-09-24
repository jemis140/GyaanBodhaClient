import React, { useState } from "react";
import { Table, Input, Button, Popover } from "antd";
import NotebookPopoverForm from "../notebookPopover";

const { Search } = Input;

const NotebookTableTab = () => {
  const [notebooks, setNotebooks] = useState([]); // Your notebook data
  const [visible, setVisible] = useState(false);

  const columns = [
    {
      title: "Notebook Name",
      dataIndex: "name",
      key: "name",
      filters: [
        {
          text: "Education",
          value: "Education",
        },
        {
          text: "Research",
          value: "Research",
        },
      ],
      onFilter: (value, record) => record.name.includes(value),
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
  ];

  const handleCreateNotebook = (notebookData) => {
    // Handle notebook creation logic here
    console.log("Creating notebook:", notebookData);
    // Update the state with the new notebook
    setNotebooks([...notebooks, notebookData]);
    setVisible(false);
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Popover
          title="Create a New Notebook"
          trigger="click"
          visible={visible}
          onVisibleChange={(vis) => setVisible(vis)}
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
      />
    </div>
  );
};

export default NotebookTableTab;
