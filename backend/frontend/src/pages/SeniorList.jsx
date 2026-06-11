import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function SeniorList() {
  const [seniors, setSeniors] = useState([]);
  const [company, setCompany] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchSeniors();
  }, []);

  const fetchSeniors = async () => {
    try {
      let url = "/seniors";

      if (company) {
        url = `/seniors?company=${company}`;
      }
      console.log("URL:", url);


      const response = await api.get(url);

      console.log(response.data);

      setSeniors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
  onClick={() =>
    navigate("/my-requests")
  }
>
  My Requests
</button>
      <h1>CampusConnect</h1>

      <h2>Senior List</h2>

      <input
        type="text"
        placeholder="Search Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <button onClick={fetchSeniors}>
        Search
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

          <button onClick={() => navigate(`/seniors/${senior._id}`)}>
            View Profile
          </button>
        </div>
      ))}
    </div>
  );
}

export default SeniorList;