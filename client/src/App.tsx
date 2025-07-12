import { useState, useEffect } from "react";
import Countdown from "react-countdown";
import "./index.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState("");
  const [message, setMessage] = useState("");
  const [submissions, setSubmissions] = useState<any[]>([]); // Store fetched submissions

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { name, email, attending };
    console.log("Sending payload:", payload);
    try {
      const response = await fetch(
        "https://wedding-invitation-server-bmfg.onrender.com/api/rsvp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();
      setMessage(result.message);
      if (response.ok) {
        setName("");
        setEmail("");
        setAttending("");
        fetchSubmissions(); // Refresh submissions after successful post
      }
    } catch (error) {
      console.error("Submission error:", error);
      setMessage("Error submitting RSVP. Please try again.");
    }
  };

  const fetchSubmissions = async () => {
    try {
      // Use /usersubmit as a client-side route, mapping to /api/rsvps
      const response = await fetch(
        "https://wedding-invitation-server-bmfg.onrender.com/api/rsvps" // Keep backend endpoint
      );
      const data = await response.json();
      setSubmissions(data);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  // Fetch submissions on component mount
  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Omar & Salma</h1>
        <p>Are Getting Married!</p>
        <p>July 20, 2025 | 6:00 PM | The Floral Venue</p>
      </header>

      <section className="countdown-section">
        <h2>Counting Down to Our Big Day</h2>
        <div className="countdown">
          <Countdown
            date={new Date("2025-07-20T18:00:00")}
            renderer={({ days, hours, minutes, seconds }) => (
              <>
                <div>
                  <span className="time">{days}</span>
                  <span className="label">Days</span>
                </div>
                <div>
                  <span className="time">{hours}</span>
                  <span className="label">Hours</span>
                </div>
                <div>
                  <span className="time">{minutes}</span>
                  <span className="label">Minutes</span>
                </div>
                <div>
                  <span className="time">{seconds}</span>
                  <span className="label">Seconds</span>
                </div>
              </>
            )}
          />
        </div>
      </section>

      <section className="rsvp-section">
        <h2>RSVP</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <select
            value={attending}
            onChange={(e) => setAttending(e.target.value)}
            required
          >
            <option value="">Will you attend?</option>
            <option value="yes">Yes, I'll be there!</option>
            <option value="no">Sorry, I can't make it.</option>
          </select>
          <button type="submit">Submit RSVP</button>
          {message && <p>{message}</p>}
        </form>
      </section>

      {/* Display Submissions with /usersubmit as a visual label */}
      <section className="submissions-section">
        <h2>RSVP Submissions (/usersubmit)</h2>
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
}

export default App;