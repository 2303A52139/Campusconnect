import { useEffect, useState } from "react";

import {
  getVerifiedSeniors,
  getUnverifiedSeniors,
  verifySenior,
  unverifySenior,
} from "../services/adminService";

function VerificationPage() {
  const [verified, setVerified] = useState([]);
  const [unverified, setUnverified] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const verifiedData =
        await getVerifiedSeniors();

      const unverifiedData =
        await getUnverifiedSeniors();

      setVerified(verifiedData.data);

      setUnverified(unverifiedData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerify = async (id) => {
    await verifySenior(id);

    loadData();
  };

  const handleUnverify = async (id) => {
    await unverifySenior(id);

    loadData();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Senior Verification</h1>

      <h2>Verified Seniors</h2>

      <table
        border="1"
        cellPadding="10"
      >
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {verified.map((senior) => (
            <tr key={senior._id}>
              <td>{senior.company}</td>

              <td>{senior.role}</td>

              <td>
                <button
                  onClick={() =>
                    handleUnverify(
                      senior._id
                    )
                  }
                >
                  Unverify
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <h2>Unverified Seniors</h2>

      <table
        border="1"
        cellPadding="10"
      >
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {unverified.map((senior) => (
            <tr key={senior._id}>
              <td>{senior.company}</td>

              <td>{senior.role}</td>

              <td>
                <button
                  onClick={() =>
                    handleVerify(
                      senior._id
                    )
                  }
                >
                  Verify
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VerificationPage;