import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import api from "../services/api";
import Loader from "../components/Common/Loader";

export default function SeniorRequests() {
  const { user, token } = useUser();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) fetchRequests();
  }, [user]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/requests/senior/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(response.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (requestId, action) => {
    try {
      await api.put(`/requests/${requestId}/${action}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchRequests();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update request");
    }
  };

  if (!user) return <Loader message="Loading requests..." />;
  if (loading) return <Loader message="Loading requests..." />;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <h1 className="text-3xl font-bold">Incoming Requests</h1>
      {error && (
        <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">
          {error}
        </div>
      )}
      {requests.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-slate-300">
          No incoming requests yet.
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request._id}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">{request.requestType}</h2>
                  <p className="text-sm text-slate-400">
                    From: {request.juniorId?.name || request.juniorId}
                  </p>
                </div>
                <span className="rounded-full bg-slate-700/80 px-3 py-1 text-xs text-slate-200">
                  {request.status}
                </span>
              </div>
              <p className="mt-4 text-slate-300">{request.message}</p>

              {request.status === "Pending" && (
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() => handleAction(request._id, "accept")}
                    className="rounded-3xl bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-500"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(request._id, "reject")}
                    className="rounded-3xl bg-red-600 px-4 py-2 text-white hover:bg-red-500"
                  >
                    Reject
                  </button>
                </div>
              )}

              {request.status === "Accepted" && request.conversationId && (
                <button
                  onClick={() => navigate(`/chat/${request.conversationId}`)}
                  className="mt-4 rounded-3xl bg-brand-500 px-4 py-2 text-white hover:bg-brand-400"
                >
                  Open Chat
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}