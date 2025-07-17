import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa"; // Import the trash icon
import "./index.css"; // Assuming your CSS for table styling is here.

// Extend the interface to include the MongoDB _id
interface RSVP {
  _id: string; // MongoDB's default ID field
  name: string;
  attending: string;
  createdAt: string;
}

const SubmissionsPage = () => {
  const [submissions, setSubmissions] = useState<RSVP[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null); // To track which item is being deleted

  const fetchSubmissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://wedding-invitation-server-bmfg.onrender.com/api/rsvps",
        { cache: "no-store" }
      );
      console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("API Response:", data);
      setSubmissions(data);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      setError("Failed to load submissions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this submission?")) {
      return; // Stop if the user cancels
    }

    setDeletingId(id); // Set the ID of the item being deleted to show loading state
    setError(null); // Clear any previous errors

    try {
      const response = await fetch(`https://wedding-invitation-server-bmfg.onrender.com/api/rsvps/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }

      // If successful, filter out the deleted submission from the state
      setSubmissions(prevSubmissions => prevSubmissions.filter(sub => sub._id !== id));
      console.log(`Submission with ID ${id} deleted successfully.`);
    } catch (err) {
      console.error("Error deleting submission:", err);
      setError(`Failed to delete submission: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setDeletingId(null); // Reset deleting ID
    }
  };


  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <div className="container">
      <header>
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
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Message</th>
                  <th>Submitted At (Cairo Time)</th>
                  <th>Actions</th> {/* New column for actions */}
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission._id}> {/* Use _id as key, it's unique */}
                    <td>{submission.name}</td>
                    <td>{submission.attending}</td>
                    <td>
                      {new Date(submission.createdAt).toLocaleString('en-US', { timeZone: 'Africa/Cairo' })}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(submission._id)}
                        disabled={deletingId === submission._id} // Disable button if this item is being deleted
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "#b83232", // Red color for trash icon
                          fontSize: "1.2em",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        title="Delete this submission"
                      >
                        {deletingId === submission._id ? (
                          <div className="spinner-small"></div> // Small spinner while deleting
                        ) : (
                          <FaTrash />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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