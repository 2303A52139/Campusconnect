import axios from "axios";
import { getMessages, sendMessage } from "../services/chatServices";
const API_URL = "http://localhost:5000/api/chat";

export const createConversation = async (participants, token) => {
  const response = await axios.post(
    `${API_URL}/conversation`,
    { participants },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};

export const sendMessage = async (messageData, token) => {
  const response = await axios.post(`${API_URL}/message`, messageData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const getMessages = async (conversationId, token) => {
  const response = await axios.get(`${API_URL}/messages/${conversationId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};