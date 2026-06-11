import { useState, useEffect } from "react";
import {
  saveSenior,
  getSavedSeniors,
  removeSavedSenior,
} from "../services/savedSeniorService";

function SavedSeniorPage() {
  const [savedSeniors, setSavedSeniors] =
    useState([]);
  // Temporary IDs for testing
  const juniorId =
    "685abc123456789012345678";

  const loadSavedSeniors =
    async () => {
      try {
        const data =
          await getSavedSeniors(
            juniorId
          );

        setSavedSeniors(data);
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    loadSavedSeniors();
  }, []);

  const handleSave = async () => {
    try {
      await saveSenior({
        // Temporary IDs for testing
        juniorId,
        seniorId:
          "665111111111111111111111",
      });

      loadSavedSeniors();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page-container">
      <h1>Saved Seniors</h1>

      <button onClick={handleSave}>
        Save Senior
      </button>
      {savedSeniors.map((senior) => (
        <div
          key={senior._id}
          className="card"
        >
          <p>
            Senior ID:
            {senior.seniorId}
          </p>
          <button
            onClick={async () => {
              await removeSavedSenior(
                senior._id
              );
              loadSavedSeniors();
            }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default SavedSeniorPage;