import { useEffect, useState } from "react";
import { getNotifications, markAsRead } from "../services/notificationService";
import { useUser } from "../context/UserContext";
import Loader from "../components/Common/Loader";

function NotificationsPage() {
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
    } catch (fetchError) {
      console.error(fetchError);
      setError(fetchError.response?.data?.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadNotifications();
    }
  }, [user]);

  const handleMarkAsRead = async (notificationId) => {
    try {
      setMarkingId(notificationId);
      setError("");
      await markAsRead(notificationId);
      await loadNotifications();
    } catch (markError) {
      console.error(markError);
      setError(markError.response?.data?.message || "Failed to mark notification as read");
    } finally {
      setMarkingId("");
    }
  };

  if (loading) return <Loader message="Loading notifications..." />;

  return (
    <div className="page-container">
      <h1>Notifications</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Your Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification._id}
            className="card"
            style={{
              padding: "15px",
              marginBottom: "10px",
              backgroundColor: notification.isRead ? "#f9f9f9" : "#fffacd",
              borderLeft: notification.isRead ? "4px solid #ccc" : "4px solid #ffc107"
            }}
          >
            <p><strong>{notification.title}</strong></p>
            {notification.message && <p>{notification.message}</p>}
            <p>
              <small>
                Type: {notification.type} | {notification.isRead ? "Read" : "Unread"}
              </small>
            </p>
            {!notification.isRead && (
              <button
                onClick={() => handleMarkAsRead(notification._id)}
                disabled={markingId === notification._id}
              >
                {markingId === notification._id ? "Marking..." : "Mark as Read"}
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default NotificationsPage;