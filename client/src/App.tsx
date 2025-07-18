
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Countdown from "react-countdown";
import "./index.css";
import SubmissionsPage from "./SubmissionsPage";
 
function App() {
  const [name, setName] = useState("");
   const [attending, setAttending] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    const payload = { name, attending };
    console.log("Sending payload:", payload);
    try {
      console.log("Submitting RSVP...");
      const response = await fetch(
        "https://wedding-invitation-server-bmfg.onrender.com/api/rsvp", // Use Render URL
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      console.log(result);
 
      if (response.ok) {
        setMessage("You’re on the guest list! 🎉");
        setName("");
         setAttending("");
      } else {
        setMessage("Error submitting RSVP. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setMessage("Error submitting RSVP. Please try again.");
    } finally {
      setLoading(false); // Set loading to false when submission finishes (success or error)
    }
  };

  return (
    <Router>
      <div className="container">
        <header>
          <h1>Mohamed & Rawan</h1>
          <p style={{ color: "#9b2c2c" }}>Are Getting Married!</p>
          <p style={{ color: "#9b2c2c" }}>
            AUG 23, 2025 | 9:00 PM | Dream Land
          </p>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <section className="countdown-section">
                  <h2>Counting Down to Our Big Day</h2>
                  <div className="countdown">
                    <Countdown
                      date={new Date("2025-08-23T21:00:00")}
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

                <section className="location-section">
                  <h2>Wedding Location</h2>
                  <div className="map-container">
                    <iframe
                      title="Wedding Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.02423341193!2d31.0959174752618!3d31.015864174951166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7a51f6c3ddc6d%3A0x466fa7f23669fe05!2z2YXYrNmF2YjYsdmK2Kk!5e0!3m2!1sar!2seg!4v1710440000000!5m2!1sar!2seg"
                      width="80%"
                      height="300"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  <a
                    href="https://www.google.com/maps/place/%D9%82%D8%A7%D8%B9%D9%87+%D8%AF%D8%B1%D9%8A%D9%85+%D9%84%D8%A7%D9%86%D8%AF+%D8%A7%D9%84%D8%AC%D8%A7%D8%A8%D8%B1%D9%8A%D8%A9+%D8%B7%D8%B1%D9%8A%D9%82+%D9%83%D9%81%D8%B1+%D8%A7%D9%84%D8%B4%D9%8A%D8%AE%E2%80%AD/@31.0158642,31.0959175,17z/data=!3m1!4b1!4m6!3m5!1s0x14f7a51f6c3ddc6d:0x466fa7f23669fe05!8m2!3d31.0158596!4d31.0984924!16s%2Fg%2F11s8dxsc7r?entry=ttu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-button"
                  >
                    Open in Google Maps
                  </a>
                </section>

                <section className="rsvp-section">
                  <h2>You’re In! ❤️</h2>
                  <p style={{ color: "#b83232", fontSize: "1rem", marginBottom: "15px" }}>
                    fill out the form below to send us nice message! We can't wait to celebrate with you. ❤️
                  </p>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={loading} // Disable input while loading
                    />
               <textarea
                      placeholder="Your message to us..."
                      value={attending}
                      onChange={(e) => setAttending(e.target.value)}
                      required
                      disabled={loading}
                      className="form-textarea"
                    />
                           {/* <input
                      type="text"
                      placeholder="Will you attend? (e.g., 'Yes, I’ll celebrate with you!' or 'No, but wishing you joy!')"
                      value={attending}
                      onChange={(e) => setAttending(e.target.value)}
                      required
                      disabled={loading} // Disable input while loading
                    /> */}
                    
                    <button type="submit" disabled={loading}> {/* Disable button while loading */}
                      {loading ? (
                        <div className="spinner"></div> // Spinner element
                      ) : (
                        "Submit"
                      )}
                    </button>
                    {message && <p style={{ color: "#b83232" }}>{message}</p>}
                  </form>
                </section>
              </>
            }
          />
                    <Route path="/usersubmit" element={<SubmissionsPage />} />

          {/* If you have a SubmissionsPage component, uncomment the line below */}
          {/* <Route path="/usersubmit" element={<SubmissionsPage />} /> */}
        </Routes>

        <footer>
          <p style={{ color: "#9b2c2c" }}>
            We can't wait to celebrate with you!
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
