import { useEffect, useState } from "react";
import { getStats } from "../services/adminService";
import AdminStatsCard from "../components/AdminStatsCard";
function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getStats();
      console.log(response.data);
      setStats(response.data);
    } catch (error) {
  console.log("ERROR:", error);
}
  };

  if (!stats) {
    return <h2>Loading...</h2>;
  }

  return (
  <div style={{ padding: "30px" }}>
    <h1>Admin Dashboard</h1>

    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      <AdminStatsCard
        title="Companies"
        value={stats.companies.total}
      />

      <AdminStatsCard
        title="Reports"
        value={stats.reports.total}
      />

      <AdminStatsCard
        title="Users"
        value={stats.users.total}
      />

      <AdminStatsCard
        title="Verified Seniors"
        value={stats.seniorVerification.verified}
      />

      <AdminStatsCard
        title="Requests"
        value={stats.requests.total}
      />
    </div>
  </div>
);
}

export default AdminDashboard;