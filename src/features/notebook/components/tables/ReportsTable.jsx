import React, { useState } from "react";
import { Table } from "antd";

const ReportTableTab = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      reportName: "Report 1",
      notebookName: "Notebook A",
      createdAt: "2023-09-23",
    },
    {
      id: 2,
      reportName: "Report 2",
      notebookName: "Notebook B",
      createdAt: "2023-09-24",
    },
    // ... Add more report data as needed
  ]);

  const columns = [
    {
      title: "Report Name",
      dataIndex: "reportName",
      key: "reportName",
    },
    {
      title: "Notebook Name",
      dataIndex: "notebookName",
      key: "notebookName",
    },
    {
      title: "Date Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  return (
    <Table
      dataSource={reports}
      columns={columns}
      bordered
      size="small"
      pagination={{ pageSize: 10 }}
    />
  );
};

export default ReportTableTab;
