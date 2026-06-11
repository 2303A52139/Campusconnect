import axios from "axios";

const API_URL = "http://localhost:5000/api/chat";

export const createConversation = async (participants) => {
  const response = await axios.post(
    `${API_URL}/conversation`,
    { participants }
  );

  return response.data;
};

export const sendMessage = async (messageData) => {
  const response = await axios.post(
    `${API_URL}/message`,
    messageData
  );

  return response.data;
};

export const getMessages = async (conversationId) => {
  const response = await axios.get(
    `${API_URL}/messages/${conversationId}`
  );

  return response.data;
};