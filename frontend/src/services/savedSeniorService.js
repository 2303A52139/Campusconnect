import axios from "axios";

const API_URL =
  "http://localhost:5000/api/saved-seniors";

export const saveSenior = async (data) => {
  const response = await axios.post(
    API_URL,
    data
  );

  return response.data;
};

export const getSavedSeniors = async (
  juniorId
) => {
  const response = await axios.get(
    `${API_URL}/${juniorId}`
  );

  return response.data;
};

export const removeSavedSenior = async (
  id
) => {
  const response = await axios.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};