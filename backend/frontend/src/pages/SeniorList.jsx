import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function SeniorList() {
  const [seniors, setSeniors] = useState([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [availability, setAvailability] = useState("");
  const [verified, setVerified] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchSeniors();
  }, []);

  const fetchSeniors = async () => {
    try {
      const url = `/seniors?company=${company}&role=${role}&availability=${availability}&verified=${verified}`;

      const response = await api.get(url);

      setSeniors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={() => navigate("/my-requests")}>
        My Requests
      </button>

      <button onClick={() => navigate("/request-stats")}>
        Statistics
      </button>

      <h1>CampusConnect</h1>

      <h2>Senior List</h2>

      <input
        type="text"
        placeholder="Search Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <br />
      <br />

      <select
        value={availability}
        onChange={(e) =>
          setAvailability(e.target.value)
        }
      >
        <option value="">
          All Availability
        </option>

        <option value="Available">
          Available
        </option>

        <option value="Limited Availability">
          Limited Availability
        </option>
      </select>

      <br />
      <br />

      <select
        value={verified}
        onChange={(e) =>
          setVerified(e.target.value)
        }
      >
        <option value="">
          All
        </option>

        <option value="true">
          Verified
        </option>

        <option value="false">
          Not Verified
        </option>
      </select>

      <br />
      <br />

      <button onClick={fetchSeniors}>
        Search
      </button>

      <button
        onClick={() => {
          setCompany("");
          setRole("");
          setAvailability("");
          setVerified("");

          window.location.reload();
        }}
      >
        Clear
      </button>

      {seniors.map((senior) => (
        <div
          key={senior._id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            margin: "10px",
            borderRadius: "10px"
          }}
        >
          <h3>{senior.company}</h3>

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
            <strong>Verified:</strong>{" "}
            {senior.verified ? "Yes" : "No"}
          </p>

          <button
            onClick={() =>
              navigate(`/seniors/${senior._id}`)
            }
          >
            View Profile
          </button>
        </div>
      ))}
    </div>
  );
}

export default SeniorList;