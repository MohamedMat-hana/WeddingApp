import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Countdown from "react-countdown";
import "./index.css";
import SubmissionsPage from "./SubmissionsPage";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState("");
  const [message, setMessage] = useState("");

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
      }
    } catch (error) {
      console.error("Submission error:", error);
      setMessage("Error submitting RSVP. Please try again.");
    }
  };

  return (
    <Router>
      <div className="container">
        <header>
          <h1>Mohamed & Rawan</h1>
          <p style={{color:"#9b2c2c"}}>Are Getting Married!</p>
          <p style={{color:"#9b2c2c"}}>AUG 23, 2025 | 9:00 PM | Dream Land</p>
          <nav>
            <Link to="/">Home</Link> | <Link to="/usersubmit">Submissions</Link>
          </nav>
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
  <p>قاعة دريم لاند الجابرية - طريق كفر الشيخ</p>
  <div className="map-container">
    <iframe
      title="Wedding Location"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.02423341193!2d31.0959174752618!3d31.015864174951166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7a51f6c3ddc6d%3A0x466fa7f23669fe05!2z2YXYrNmF2YjYsdmK2Kk!5e0!3m2!1sar!2seg!4v1710440000000!5m2!1sar!2seg"
      width="50%"
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
                    <input
                      type="text"
                      placeholder="Message"
                      value={attending}
                      onChange={(e) => setAttending(e.target.value)}
                      required
                    />
                    <button type="submit">Submit RSVP</button>
                    {message && <p>{message}</p>}
                  </form>
                </section>
              </>
            }
          />
          <Route path="/usersubmit" element={<SubmissionsPage />} />
        </Routes>

        <footer>
          <p>We can't wait to celebrate with you!</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
