import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const SubmissionsPage = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch(
        "https://wedding-invitation-server-bmfg.onrender.com/api/rsvps"
      );
      const data = await response.json();
      setSubmissions(data);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Omar & Salma</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/usersubmit">Submissions</Link>
        </nav>
      </header>

      <section className="submissions-section">
        <h2>RSVP Submissions</h2>
        {submissions.length > 0 ? (
          <ul>
            {submissions.map((submission, index) => (
              <li key={index}>
                {submission.name} ({submission.email}) - {submission.attending}
              </li>
            ))}
          </ul>
        ) : (
          <p>No submissions yet.</p>
        )}
      </section>

      <footer>
        <p>We can't wait to celebrate with you!</p>
      </footer>
    </div>
  );
};

export default SubmissionsPage;
