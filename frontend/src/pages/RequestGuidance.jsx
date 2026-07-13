import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useUser } from "../context/UserContext";
import Loader from "../components/Common/Loader";

export default function RequestGuidance() {
  const { id: seniorId } = useParams();
  const { user, token } = useUser();
  const [requestType, setRequestType] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const submitRequest = async () => {
    setError("");
    setSuccess("");

    if (!user) return setError("Please login first");
    if (!seniorId) return setError("Senior ID not found");
    if (!requestType) return setError("Please select request type");
    if (!message.trim()) return setError("Please enter a message");
    if (message.trim().length < 10) return setError("Message must be at least 10 characters");

    try {
      setLoading(true);
      await api.post(
        "/requests",
        {
          juniorId: user._id,
          seniorId,
          requestType,
          message: message.trim(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess("Request submitted successfully");
      setRequestType("");
      setMessage("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader message="Submitting request..." />;

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-soft">
      <h1 className="text-3xl font-bold">Request Guidance</h1>
      {error && <div className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}
      {success && <div className="mt-4 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-3 text-sm text-emerald-200">{success}</div>}

      <div className="mt-6 space-y-4">
        <select className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-brand-400" value={requestType} onChange={(e) => setRequestType(e.target.value)}>
          <option value="">Select request type</option>
          <option>Interview Preparation</option>
          <option>Career Guidance</option>
          <option>Onboarding Guidance</option>
          <option>Referral Opportunities</option>
        </select>

        <textarea
          className="min-h-40 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-brand-400"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a clear request message..."
        />

        <button className="rounded-xl bg-brand-500 px-4 py-3 font-semibold text-white hover:bg-brand-400" onClick={submitRequest}>
          Submit Request
        </button>
      </div>
    </div>
  );
}