// Hero.jsx-la Order Now button-a Restaurants page-ku link pann
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  const [location, setLocation] = useState("");
  const [locating, setLocating] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (location.trim()) {
      navigate(`/restaurants?location=${location}`);
    } else {
      alert("Please enter your location!");
    }
  };

  // GPS location detect pann
  const handleGPS = () => {
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const area = data.address.suburb || data.address.city || data.address.town || "Your Location";
          setLocation(area);
        } catch {
          setLocation(`${latitude.toFixed(3)}, ${longitude.toFixed(3)}`);
        }
        setLocating(false);
      },
      () => {
        alert("Location access denied!");
        setLocating(false);
      }
    );
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge">🚀 Free delivery on first order</div>
        <h1 className="hero-title">
          Hungry? <span>We've Got</span><br />
          You Covered! 🍕
        </h1>
        <p className="hero-subtitle">
          Order from the best restaurants near you.
          Fresh, fast & delivered to your door.
        </p>

        <div className="hero-search">
          <div className="search-input-wrap">
            <span className="search-icon">📍</span>
            <input
              type="text"
              placeholder="Enter your delivery location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            {/* GPS button */}
            <button
              className="gps-btn"
              onClick={handleGPS}
              title="Use my location"
            >
              {locating ? "⏳" : "🎯"}
            </button>
          </div>
          <button className="search-btn" onClick={handleSearch}>
            Find Food
          </button>
        </div>

        <div className="hero-stats">
          <div className="stat"><strong>500+</strong><span>Restaurants</span></div>
          <div className="stat-divider" />
          <div className="stat"><strong>30 min</strong><span>Avg Delivery</span></div>
          <div className="stat-divider" />
          <div className="stat"><strong>50k+</strong><span>Happy Users</span></div>
        </div>
      </div>

      <div className="hero-image">
        <div className="hero-img-circle">
          <span className="hero-emoji">🍔</span>
        </div>
        <div className="float-card card1">🍕 Pizza<br/><small>⭐ 4.8</small></div>
        <div className="float-card card2">🚴 30 min<br/><small>Free delivery</small></div>
        <div className="float-card card3">🍜 Biryani<br/><small>⭐ 4.9</small></div>
      </div>
    </section>
  );
};

export default Hero;