import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const WORDS = ["Biryani 🍛", "Pizza 🍕", "Burgers 🍔", "Sushi 🍣", "Tacos 🌮", "Desserts 🧁"];

const Hero = () => {
  const [location, setLocation] = useState("");
  const [locating, setLocating] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const navigate = useNavigate();

  // Typewriter effect
  useEffect(() => {
    const word = WORDS[wordIndex];
    let timeout;
    if (typing) {
      if (displayed.length < word.length) {
        timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 1400);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
      } else {
        setWordIndex((i) => (i + 1) % WORDS.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, wordIndex]);

  const handleSearch = () => {
    if (location.trim()) navigate(`/restaurants?location=${location}`);
    else alert("Please enter your location!");
  };

  const handleGPS = () => {
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`
          );
          const data = await res.json();
          setLocation(data.address.suburb || data.address.city || "Your Location");
        } catch {
          setLocation("Your Location");
        }
        setLocating(false);
      },
      () => { alert("Location access denied!"); setLocating(false); }
    );
  };

  return (
    <section className="hero">
      {/* Animated background orbs */}
      <div className="hero-bg">
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="orb orb3" />
        <div className="orb orb4" />
      </div>

      {/* Floating food particles */}
      <div className="particles" aria-hidden="true">
        {["🍕","🍔","🌮","🍜","🍣","🧁","🍛","🥗","🍩","🥪"].map((f, i) => (
          <span key={i} className={`particle p${i}`}>{f}</span>
        ))}
      </div>

      <div className="hero-inner">
        {/* Left content */}
        <div className="hero-content">
          <div className="hero-badge animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="badge-dot" />
            🚀 Free delivery on first order
          </div>

          <h1 className="hero-title animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Order
            <span className="typewriter-wrap">
              <span className="typewriter">{displayed}</span>
              <span className="cursor">|</span>
            </span>
            <br />
            <span className="title-sub">Delivered Fast 🔥</span>
          </h1>

          <p className="hero-subtitle animate-fade-up" style={{ animationDelay: "0.35s" }}>
            From the best restaurants near you — hot, fresh, and at your door in 30 minutes.
          </p>

          <div className="hero-search animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <div className="search-box">
              <span className="search-icon">📍</span>
              <input
                type="text"
                placeholder="Enter your delivery location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button className="gps-btn" onClick={handleGPS} title="Use my location">
                {locating ? "⏳" : "🎯"}
              </button>
            </div>
            <button className="search-btn" onClick={handleSearch}>
              <span>Find Food</span>
              <span className="btn-arrow">→</span>
            </button>
          </div>

          <div className="hero-stats animate-fade-up" style={{ animationDelay: "0.65s" }}>
            <div className="stat">
              <strong>500+</strong>
              <span>Restaurants</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <strong>30 min</strong>
              <span>Avg Delivery</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <strong>50K+</strong>
              <span>Happy Users</span>
            </div>
          </div>
        </div>

        {/* Right visual */}
        <div className="hero-visual animate-scale-in" style={{ animationDelay: "0.3s" }}>
          <div className="visual-ring ring1" />
          <div className="visual-ring ring2" />
          <div className="visual-ring ring3" />

          <div className="visual-plate">
            <div className="plate-glow" />
            <span className="plate-emoji">🍔</span>
          </div>

          {/* Float cards */}
          <div className="float-card fc1 animate-float-in" style={{ animationDelay: "0.7s" }}>
            <span>🍕</span>
            <div>
              <div className="fc-name">Pizza Palace</div>
              <div className="fc-meta">⭐ 4.8 · 20 min</div>
            </div>
          </div>

          <div className="float-card fc2 animate-float-in" style={{ animationDelay: "0.9s" }}>
            <span>🚴</span>
            <div>
              <div className="fc-name">Out for delivery</div>
              <div className="fc-meta">Arriving in 8 min</div>
            </div>
          </div>

          <div className="float-card fc3 animate-float-in" style={{ animationDelay: "1.1s" }}>
            <span>🎉</span>
            <div>
              <div className="fc-name">Order Delivered!</div>
              <div className="fc-meta">Rate your meal</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;