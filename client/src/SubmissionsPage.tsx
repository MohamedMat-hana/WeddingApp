import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css"; 

const SubmissionsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubmissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://wedding-invitation-server-bmfg.onrender.com/api/rsvps",
        { cache: "no-store" }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setSubmissions(data);
      console.log("data",data);
      
    } catch (error) {
      console.error("Error fetching submissions:", error);
      setError("Failed to load submissions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Mohamed & Rawan</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/usersubmit">Submissions</Link>
        </nav>
      </header>

      <section className="submissions-section">
        <h2>RSVP Submissions</h2>
        {loading ? (
          <p>Loading submissions...</p>
        ) : error ? (
          <p style={{ color: "#b83232" }}>{error}</p>
        ) : submissions.length > 0 ? (
          <ul>
            {submissions.map((submission, index) => (
              <li key={index}>
                <strong>{submission.name}</strong> ({submission.email}) - {submission.attending}
              </li>
            ))}
          </ul>
        ) : (
          <p>No submissions yet.</p>
        )}
        <button
          onClick={fetchSubmissions}
          style={{
            background: "#b83232",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "15px",
          }}
        >
          Refresh Submissions
        </button>
      </section>

      <footer>
        <p style={{ color: "#9b2c2c" }}>We can't wait to celebrate with you!</p>
      </footer>
    </div>
  );
};

export default SubmissionsPage;