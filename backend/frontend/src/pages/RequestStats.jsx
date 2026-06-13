import { useEffect, useState } from "react";
import api from "../services/api";

function RequestStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get(
        "/requests/stats"
      );

      console.log(response.data);

      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!stats) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>Request Statistics</h1>

      <h2>
        Total Requests: {stats.totalRequests}
      </h2>

      <h3>
        Pending: {stats.pending}
      </h3>

      <h3>
        Accepted: {stats.accepted}
      </h3>

      <h3>
        Rejected: {stats.rejected}
      </h3>

      <h3>
        Expired: {stats.expired}
      </h3>
    </div>
  );
}

export default RequestStats;