import { useState, useEffect } from "react";
import {
  createNotification,
  getNotifications,
  markAsRead,
} from "../services/notificationService";

function NotificationsPage() {
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] =
    useState([]);

  const userId =
    "685abc123456789012345678";

  const loadNotifications = async () => {
    try {
      const data =
        await getNotifications(userId);
      console.log(
        "Notifications:",
        data
      );
      setNotifications(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleCreate = async () => {
    try {
      await createNotification({
        userId,
        title: message,
        type: "NEW_MESSAGE",
        senderName:"Junior",
        message:"text",
      });

      alert("Notification Created");

      setMessage("");

      loadNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page-container">
      <h1>Notifications</h1>

      <input
        type="text"
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        placeholder="Notification Title"
      />

      <button onClick={handleCreate}>
        Create Notification
      </button>

      <h2>Notifications List</h2>
      {notifications.map(
        (notification) => (
          <div
            key={notification._id}
            className="card"
          >
            <p>{notification.title}</p>
            <p>{notification.type}</p>
            <p>
              {notification.isRead
                ? "Read"
                : "Unread"}
            </p>
            {!notification.isRead && (
              <button
                onClick={async () => {
                  await markAsRead(
                    notification._id
                  );
                  loadNotifications();
                }}
              >
                Mark as Read
              </button>
            )}
          </div>
        )
      )}
    </div>
  );
}
export default NotificationsPage;