import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div
      style={{
        width: "250px",
        minHeight: "100vh",
        background: "#111827",
        padding: "20px",
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: "30px",
        }}
      >
        CampusConnect
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <Link to="/">Dashboard</Link>

        <Link to="/users">Users</Link>

        <Link to="/verification">
          Verification
        </Link>

        <Link to="/companies">
          Companies
        </Link>

        <Link to="/reports">
          Reports
        </Link>
      </div>
    </div>
  );
}

export default AdminSidebar;