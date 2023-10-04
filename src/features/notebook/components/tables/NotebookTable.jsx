import React, { useState, useEffect } from "react";
import { Collapse, Input, Button, Popover } from "antd";
import { getNotebooks } from "../../api/notebookAPI";
import NotebookForm from "./NotebookForm";
import Loader from "../../../../components/common/conversation/Loader";

const { Search } = Input;
const { Panel } = Collapse;

const NotebookTableTab = () => {
  const [notebooks, setNotebooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPopoverVisible, setPopoverVisible] = useState(false);

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

  const handlePopoverClick = () => {
    setPopoverVisible(!isPopoverVisible);
  };

  const popoverStyle = {
    left: "calc(50% + 100px)",
    transform: "translateX(-50%)",
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          marginTop: "10px",
          marginLeft: "70px",
          padding: "15px",
          justifyContent: "flex-start",
          flexDirection: "row",
        }}
      >
        <Popover
          title="Create a New Notebook"
          trigger="click"
          content={<NotebookForm />}
          visible={isPopoverVisible}
          onVisibleChange={handlePopoverClick}
          style={{
            textAlign: "center",
            marginLeft: "15px",
            justifyContent: "center",
          }}
        >
          <Button
            type="primary"
            onClick={handlePopoverClick}
            style={{ marginBottom: "15px", marginRight: "16px" }}
          >
            Create New Notebook
          </Button>
        </Popover>
        <Search
          placeholder="Search notebook name"
          onSearch={(value) => console.log(value)}
          style={{ width: 200 }}
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
