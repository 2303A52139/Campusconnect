import { useEffect, useState } from "react";
import api from "../services/api";

function MyRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await api.get(
        "/requests/junior/685000000000000000000002"
      );

      setRequests(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>My Requests</h1>

      {requests.map((request) => (
        <div key={request._id}>
          <h3>{request.requestType}</h3>

          <p>{request.message}</p>

          <p
  style={{
    color:
      request.status === "Accepted"
        ? "green"
        : request.status === "Rejected"
        ? "red"
        : request.status === "Pending"
        ? "orange"
        : "gray"
  }}
>
  Status: {request.status}
</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default MyRequests;