import { useState } from "react";
import api from "../services/api";

function RequestGuidance() {
  const [requestType, setRequestType] =
    useState("");

  const [message, setMessage] =
    useState("");
  const submitRequest = async () => {
    if (!requestType) {
      alert("Please select request type");
      return;
    }

    if (!message.trim()) {
      alert("Please enter message");
      return;
    }

    try {
      const response = await api.post(
        "/requests",
        {
          juniorId:
            "685000000000000000000002",

          seniorId:
            "685000000000000000000001",

          requestType,

          message
        }
      );

      alert(
        "Request Submitted Successfully"
      );

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Request Guidance</h1>

      <label>
        Request Type
      </label>

      <br />

      <select
        value={requestType}
        onChange={(e) =>
          setRequestType(e.target.value)
        }
      >
        <option value="">
          Select
        </option>

        <option>
          Interview Preparation
        </option>

        <option>
          Career Guidance
        </option>

        <option>
          Onboarding Guidance
        </option>

        <option>
          Referral Opportunities
        </option>
      </select>

      <br />
      <br />

      <label>
        Message
      </label>

      <br />

      <textarea
        rows="5"
        cols="40"
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={submitRequest}>
        Submit Request
      </button>
    </div>
  );
}

export default RequestGuidance;