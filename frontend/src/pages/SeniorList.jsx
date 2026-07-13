import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function SeniorList() {
  const [seniors, setSeniors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ page: 1, limit: 12, total: 0, totalPages: 1 });
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [availability, setAvailability] = useState("");
  const [verified, setVerified] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchSeniors(page, { company, role, availability, verified });
  }, [page]);

  const fetchSeniors = async (
    pageNumber = 1,
    filters = { company, role, availability, verified }
  ) => {
    try {
      setLoading(true);
      setError("");

      const url = `/seniors?company=${encodeURIComponent(filters.company)}&role=${encodeURIComponent(filters.role)}&availability=${encodeURIComponent(filters.availability)}&verified=${encodeURIComponent(filters.verified)}&page=${pageNumber}&limit=12`;

      const response = await api.get(url);

      setSeniors(response.data?.data || []);
      setMeta(response.data?.meta || { page: 1, limit: 12, total: 0, totalPages: 1 });
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to load seniors");
      setSeniors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    if (e) {
      e.preventDefault();
    }

    setPage(1);
    fetchSeniors(1, { company, role, availability, verified });
  };

  const handleClear = () => {
    setCompany("");
    setRole("");
    setAvailability("");
    setVerified("");
    setPage(1);
    fetchSeniors(1, { company: "", role: "", availability: "", verified: "" });
  };

  return (
    <div>
      <button onClick={() => navigate("/my-requests")}>
        My Requests
      </button>

      <button onClick={() => navigate("/request-stats")}>
        Statistics
      </button>

      <h1>CampusConnect</h1>

      <h2>Senior List</h2>
      <p>Apply your filters, then click Check Seniors to see matching mentors.</p>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <br />
        <br />

        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value="">All Availability</option>
          <option value="Available">Available</option>
          <option value="Limited Availability">Limited Availability</option>
          <option value="Not Accepting Requests">Not Accepting Requests</option>
        </select>

        <br />
        <br />

        <select
          value={verified}
          onChange={(e) => setVerified(e.target.value)}
        >
          <option value="">All</option>
          <option value="true">Verified</option>
          <option value="false">Not Verified</option>
        </select>

        <br />
        <br />

        <button type="submit">
          Check Seniors
        </button>

        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </form>

      {loading && <p>Loading seniors...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && seniors.length === 0 && (
        <p>No seniors found.</p>
      )}

      {seniors.map((senior) => (
        <div
          key={senior._id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            margin: "10px",
            borderRadius: "10px"
          }}
        >
          <h3>{senior.company}</h3>

          <p>
            <strong>Role:</strong> {senior.role}
          </p>

          <p>
            <strong>City:</strong> {senior.city}
          </p>

          <p>
            <strong>Experience:</strong>{" "}
            {senior.experience} Years
          </p>

          <p>
            <strong>Availability:</strong>{" "}
            {senior.availability}
          </p>

          <p>
            <strong>Verified:</strong>{" "}
            {senior.verified ? "Yes" : "No"}
          </p>

          <button
            onClick={() =>
              navigate(`/seniors/${senior._id}`)
            }
          >
            View Profile
          </button>
        </div>
      ))}

      <div style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "20px" }}>
        <button disabled={page <= 1} onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </button>
        <span>
          Page {meta.page} of {meta.totalPages}
        </span>
        <button disabled={page >= meta.totalPages} onClick={() => setPage((prev) => prev + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default SeniorList;