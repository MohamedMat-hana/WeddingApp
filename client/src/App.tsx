import { useState } from "react";
import Countdown from "react-countdown";
import "./index.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState("");
  const [message, setMessage] = useState("");

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // Prevent form submission refresh
  const payload = { name, email, attending };
  console.log("Sending payload:", payload); // Debug log
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
    }
  } catch (error) {
    console.error("Submission error:", error);
    setMessage("Error submitting RSVP. Please try again.");
  }
};

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
          <button type="submit"  >Submit RSVP</button>
          {message && <p>{message}</p>}
        </form>
      </section>

      <footer>
        <p>We can't wait to celebrate with you!</p>
      </footer>
    </div>
  );
}

export default App;
