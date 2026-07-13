import { useState, useEffect } from "react";
import {
  saveSenior,
  getSavedSeniors,
  removeSavedSenior,
} from "../services/savedSeniorService";
import { useUser } from "../context/UserContext";

function SavedSeniorPage() {
  const [savedSeniors, setSavedSeniors] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user, token } = useUser();

  const loadSavedSeniors =
    async () => {
      if (!user) return;

      try {
        setLoading(true);
        const data =
          await getSavedSeniors(
            user._id
          );

        setSavedSeniors(data);
        setError("");
      } catch (error) {
        console.error(error);
        setError("Failed to load saved seniors");
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (user) {
      loadSavedSeniors();
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    // TODO: Add UI to select senior instead of hardcoded ID
    try {
      await saveSenior({
        juniorId: user._id,
        seniorId:
          "665111111111111111111111",
      });

      alert("Senior saved!");
      loadSavedSeniors();
    } catch (error) {
      console.error(error);
      setError("Failed to save senior");
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="page-container">
      <h1>Saved Seniors</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleSave}>
        Save Senior (Test)
      </button>

      {savedSeniors.length === 0 ? (
        <p>No saved seniors yet</p>
      ) : (
        savedSeniors.map((senior) => (
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
        ))
      )}
    </div>
  );
}

export default SavedSeniorPage;