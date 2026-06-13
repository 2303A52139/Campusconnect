import { useEffect, useState } from "react";

import {
  getReports,
  reviewReport,
  resolveReport,
  deleteReport,
} from "../services/adminService";

function ReportsPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    const res = await getReports();

    setReports(res.data);
  };

  const handleReview = async (id) => {
    await reviewReport(id);

    loadReports();
  };

  const handleResolve = async (id) => {
    await resolveReport(id);

    loadReports();
  };

  const handleDelete = async (id) => {
    await deleteReport(id);

    loadReports();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Reports Management</h1>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>Reason</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((report) => (
            <tr key={report._id}>
              <td>{report.reason}</td>

              <td>
                {report.description}
              </td>

              <td>{report.status}</td>

              <td>
                <button
                  onClick={() =>
                    handleReview(
                      report._id
                    )
                  }
                >
                  Review
                </button>

                <button
                  onClick={() =>
                    handleResolve(
                      report._id
                    )
                  }
                >
                  Resolve
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      report._id
                    )
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportsPage;