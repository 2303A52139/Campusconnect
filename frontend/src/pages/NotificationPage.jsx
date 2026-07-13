import { useEffect, useState } from "react";
import { getNotifications, markAsRead } from "../services/notificationService";
import { useUser } from "../context/UserContext";
import Loader from "../components/Common/Loader";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [markingId, setMarkingId] = useState("");
  const { user } = useUser();

  const loadNotifications = async () => {
    if (!user?._id) return;

    try {
      setLoading(true);
      const data = await getNotifications(user._id);
      setNotifications(data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) loadNotifications();
  }, [user]);

  const handleMarkAsRead = async (id) => {
    try {
      setMarkingId(id);
      await markAsRead(id);
      await loadNotifications();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to mark as read");
    } finally {
      setMarkingId("");
    }
  };

  if (loading) return <Loader message="Loading notifications..." />;

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-3xl font-bold">Notifications</h1>
      {error && <div className="mb-4 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}

      {notifications.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-slate-300">No notifications yet.</div>
      ) : (
        <div className="grid gap-4">
          {notifications.map((n) => (
            <div key={n._id} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft">
              <p className="font-semibold">{n.title}</p>
              {n.message && <p className="mt-2 text-sm text-slate-300">{n.message}</p>}
              <p className="mt-2 text-xs text-slate-400">{n.type} · {n.isRead ? "Read" : "Unread"}</p>
              {!n.isRead && (
                <button
                  onClick={() => handleMarkAsRead(n._id)}
                  disabled={markingId === n._id}
                  className="mt-4 rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-400 disabled:opacity-60"
                >
                  {markingId === n._id ? "Marking..." : "Mark as Read"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}