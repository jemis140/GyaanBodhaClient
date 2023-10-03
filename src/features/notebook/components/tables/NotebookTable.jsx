import React, { useState, useEffect } from "react";
import { Collapse, Input, Button, Popover } from "antd";
import { getNotebooks } from "../../api/notebookAPI";
import NotebookPopoverForm from "./NotebookPopover";
import Loader from "../../../../components/common/conversation/Loader";

const { Search } = Input;
const { Panel } = Collapse;

const NotebookTableTab = () => {
  const [notebooks, setNotebooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotebooks = async () => {
      try {
        const notebooksData = await getNotebooks();
        setNotebooks(notebooksData.notebooksMetaData);
      } catch (error) {
        console.error("Error fetching notebooks:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotebooks();
  }, []);

  return (
    <div>
      <div>
        <Popover
          title="Create a New Notebook"
          trigger="click"
          content={<NotebookPopoverForm />}
        >
          <Button type="primary">Create New Notebook</Button>
        </Popover>
        <Search
          placeholder="Search notebook name"
          onSearch={(value) => console.log(value)}
          style={{ width: 200, marginLeft: 16 }}
        />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <Collapse accordion>
          {notebooks.map((notebook, index) => (
            <Panel
              header={`Notebook ${index + 1}`}
              key={index}
              showArrow={false}
            >
              <div>
                <strong>Notebook Name:</strong> {notebook.name || "N/A"}
              </div>
              <div>
                <strong>Created At:</strong> {notebook.createdAt || "N/A"}
              </div>
              <div>
                <strong>Tags:</strong> {notebook.tags || "N/A"}
              </div>
            </Panel>
          ))}
        </Collapse>
      )}
    </div>
  );
};

export default NotebookTableTab;
