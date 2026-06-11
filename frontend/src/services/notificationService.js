import axios from "axios";

const API_URL =
  "http://localhost:5000/api/notifications";

export const createNotification = async (
  data
) => {
  const response = await axios.post(
    API_URL,
    data
  );

  return response.data;
};

export const getNotifications = async (
  userId
) => {
  const response = await axios.get(
    `${API_URL}/${userId}`
  );

  return response.data;
};

export const markAsRead = async (id) => {
  const response = await axios.put(
    `${API_URL}/${id}/read`
  );

  return response.data;
};