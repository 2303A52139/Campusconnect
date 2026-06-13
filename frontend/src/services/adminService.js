import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/admin",
});

export const getStats = () => API.get("/stats");

export const getUsers = () => API.get("/users");
export const deleteUser = (id) =>
  API.delete(`/user/${id}`);
export const getCompanies = () => API.get("/companies");
export const addCompany = (data) =>
  API.post("/company", data);

export const updateCompany = (id, data) =>
  API.put(`/company/${id}`, data);

export const deleteCompany = (id) =>
  API.delete(`/company/${id}`);
export const getReports = () => API.get("/reports");
export const verifySenior = (id) =>
  API.put(`/verify-senior/${id}`);

export const unverifySenior = (id) =>
  API.put(`/unverify-senior/${id}`);
export const getVerifiedSeniors = () =>
  API.get("/verified-seniors");

export const getUnverifiedSeniors = () =>
  API.get("/unverified-seniors");

export const reviewReport = (id) =>
  API.put(`/report/${id}/review`);

export const resolveReport = (id) =>
  API.put(`/report/${id}/resolve`);

export const deleteReport = (id) =>
  API.delete(`/report/${id}`);