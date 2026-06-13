import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function SeniorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [senior, setSenior] = useState(null);

  useEffect(() => {
    fetchSenior();
  }, []);

  const fetchSenior = async () => {
    try {
      const response = await api.get(`/seniors/${id}`);

      console.log(response.data);

      setSenior(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!senior) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>Senior Profile</h1>

      <h2>{senior.company}</h2>

      <p>
        <strong>Role:</strong> {senior.role}
      </p>

      <p>
        <strong>City:</strong> {senior.city}
      </p>

      <p>
        <strong>Experience:</strong>{" "}
        {senior.experience} Years
      </p>

      <p>
        <strong>Availability:</strong>{" "}
        {senior.availability}
      </p>

      <p>
        <strong>Work Mode:</strong>{" "}
        {senior.workMode}
      </p>

      <p>
        <strong>Verified:</strong>{" "}
        {senior.verified ? "Yes" : "No"}
      </p>
      <button
  onClick={() =>
    navigate(`/request/${id}`)
  }
>
  Request Guidance
</button>
      
    </div>
  );
}

export default SeniorProfile;