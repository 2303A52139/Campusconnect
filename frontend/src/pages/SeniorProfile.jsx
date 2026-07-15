import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import api from "../services/api";

function SeniorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [senior, setSenior] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSenior();
  }, [id]);

  const fetchSenior = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/seniors/${id}`);
      setSenior(response.data);
      setError("");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to load senior profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!senior) {
    return <h2>Senior not found</h2>;
  }

  return (
    <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-soft">
      <h1 className="text-3xl font-bold">{senior.company} Mentor</h1>

      <div className="mt-6 space-y-3 text-slate-300">
        <p>
          <strong>Role:</strong> {senior.role}
        </p>

        <p>
          <strong>City:</strong> {senior.city}
        </p>

        <p>
          <strong>Experience:</strong> {senior.experience} Years
        </p>

        <p>
          <strong>Availability:</strong> {senior.availability}
        </p>

        <p>
          <strong>Work Mode:</strong> {senior.workMode}
        </p>

        <p>
          <strong>Verified:</strong> {senior.verified ? "Yes" : "No"}
        </p>
      </div>

      {user?.role === "junior" && (
        <button
          onClick={() => navigate(`/request/${id}`)}
          className="mt-6 rounded-3xl bg-brand-500 px-5 py-3 text-white hover:bg-brand-400"
        >
          Request Connect
        </button>
      )}
    </div>
  );
}

export default SeniorProfile;