import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useUser } from "../context/UserContext";
import Loader from "../components/Common/Loader";

export default function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, token } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) fetchRequests();
  }, [user]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/requests/junior/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(response.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  const openChat = async (requestId) => {
    try {
      const response = await api.get(
        `/chat/conversation/${requestId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate(`/chat/${response.data._id}`);
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Unable to open conversation."
      );
    }
  };
  if (loading) return <Loader message="Loading your requests..." />;

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-3xl font-bold">My Requests</h1>
      {error && <div className="mb-4 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}

      {requests.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-slate-300">No requests found yet.</div>
      ) : (
        <div className="grid gap-4">
          {requests.map((request) => (
            <div key={request._id} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-semibold">{request.requestType}</h3>
                <span className="rounded-full px-3 py-1 text-xs font-medium
                  {request.status === 'Accepted' ? 'bg-emerald-500/15 text-emerald-300' :
                   request.status === 'Rejected' ? 'bg-red-500/15 text-red-300' :
                   request.status === 'Pending' ? 'bg-amber-500/15 text-amber-300' :
                   'bg-slate-500/15 text-slate-300'}">
                  {request.status}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-300">{request.message}</p>
              {request.status === "Accepted" && (
                <button
                  onClick={() => openChat(request._id)}
                  className="mt-4 rounded-xl bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
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