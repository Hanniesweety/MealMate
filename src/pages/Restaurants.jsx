import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Restaurants.css";

const dummyData = [
  { id: "1", name: "Biryani House", cuisine: "Indian", rating: 4.8, deliveryTime: "25-30", priceForTwo: 300, emoji: "🍛", distance: "1.2 km", offer: "20% OFF" },
  { id: "2", name: "Pizza Palace", cuisine: "Italian", rating: 4.6, deliveryTime: "20-25", priceForTwo: 400, emoji: "🍕", distance: "2.1 km", offer: "Free Delivery" },
  { id: "3", name: "Burger Barn", cuisine: "American", rating: 4.5, deliveryTime: "15-20", priceForTwo: 250, emoji: "🍔", distance: "0.8 km", offer: null },
  { id: "4", name: "Sushi Stop", cuisine: "Japanese", rating: 4.9, deliveryTime: "30-35", priceForTwo: 600, emoji: "🍣", distance: "3.2 km", offer: "10% OFF" },
  { id: "5", name: "Taco Town", cuisine: "Mexican", rating: 4.3, deliveryTime: "20-25", priceForTwo: 280, emoji: "🌮", distance: "1.8 km", offer: null },
  { id: "6", name: "Dessert Den", cuisine: "Bakery", rating: 4.7, deliveryTime: "10-15", priceForTwo: 200, emoji: "🧁", distance: "0.5 km", offer: "Buy 1 Get 1" },
  { id: "7", name: "Noodle Hub", cuisine: "Chinese", rating: 4.4, deliveryTime: "20-25", priceForTwo: 320, emoji: "🍜", distance: "2.4 km", offer: null },
  { id: "8", name: "Spice Garden", cuisine: "South Indian", rating: 4.8, deliveryTime: "15-20", priceForTwo: 180, emoji: "🥘", distance: "1.1 km", offer: "15% OFF" },
];

const categories = [
  { emoji: "🍛", name: "Biryani" },
  { emoji: "🍕", name: "Pizza" },
  { emoji: "🍔", name: "Burger" },
  { emoji: "🍣", name: "Sushi" },
  { emoji: "🌮", name: "Tacos" },
  { emoji: "🧁", name: "Desserts" },
  { emoji: "🍜", name: "Noodles" },
  { emoji: "🥗", name: "Healthy" },
];

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid"); // grid or map
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem("token");
        const location = searchParams.get("location") || "";
        const res = await fetch(
          `http://localhost:5000/api/restaurants?location=${location}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setRestaurants(data);
        } else {
          setRestaurants(dummyData);
        }
      } catch {
        setRestaurants(dummyData);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  const filtered = restaurants
    .filter((r) => r.name?.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortBy === "rating" ? b.rating - a.rating :
      sortBy === "delivery" ? parseInt(a.deliveryTime) - parseInt(b.deliveryTime) :
      a.priceForTwo - b.priceForTwo);

  return (
    <div className="rest-page">
      <Navbar />

      {/* hero banner with background */}
      <div className="rest-hero">
        <div className="rest-hero-overlay" />
        <div className="rest-hero-content">
          <h1>Restaurants Near You 📍</h1>
          <p>Fresh food, fast delivery — pick your favourite!</p>
          <div className="rest-search-bar">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search restaurants or cuisines..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch("")} className="rest-clear">✕</button>
            )}
          </div>
        </div>
      </div>

      {/* category pills */}
      <div className="rest-categories">
        <div className="rest-categories-inner">
          {categories.map((c) => (
            <div
              key={c.name}
              className={`rest-cat-pill ${activeCategory === c.name ? "active" : ""}`}
              onClick={() => setActiveCategory(activeCategory === c.name ? "All" : c.name)}
            >
              <span>{c.emoji}</span>
              <span>{c.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* toolbar */}
      <div className="rest-toolbar">
        <div className="rest-toolbar-inner">
          <div className="rest-count">
            {filtered.length} restaurants found
          </div>
          <div className="rest-toolbar-right">
            <select
              className="rest-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating">⭐ Top Rated</option>
              <option value="delivery">⚡ Fastest Delivery</option>
              <option value="price">💰 Price: Low to High</option>
            </select>
            <div className="rest-view-toggle">
              <button
                className={view === "grid" ? "active" : ""}
                onClick={() => setView("grid")}
              >⊞ Grid</button>
              <button
                className={view === "map" ? "active" : ""}
                onClick={() => setView("map")}
              >🗺️ Map</button>
            </div>
          </div>
        </div>
      </div>

      {/* MAP VIEW */}
      {view === "map" && (
        <div className="rest-map-view">
          <div className="rest-map-container">
            {/* OpenStreetMap embed */}
            <iframe
              title="Restaurants Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=80.2,13.0,80.3,13.1&layer=mapnik"
              className="rest-map-iframe"
            />
            {/* map pins overlay */}
            <div className="rest-map-pins">
              {filtered.slice(0, 6).map((r, i) => (
                <div
                  key={r.id}
                  className="rest-map-pin"
                  style={{
                    left: `${15 + i * 14}%`,
                    top: `${20 + (i % 3) * 25}%`,
                  }}
                  onClick={() => navigate(`/restaurants/${r.id}`)}
                >
                  <div className="rest-pin-bubble">
                    <span>{r.emoji}</span>
                    <span>₹{r.priceForTwo}</span>
                  </div>
                  <div className="rest-pin-dot" />
                </div>
              ))}
            </div>
          </div>

          {/* map sidebar */}
          <div className="rest-map-sidebar">
            <h3>Nearby Restaurants</h3>
            <div className="rest-map-list">
              {filtered.map((r) => (
                <div
                  key={r.id}
                  className="rest-map-item"
                  onClick={() => navigate(`/restaurants/${r.id}`)}
                >
                  <div className="rmi-emoji">{r.emoji}</div>
                  <div className="rmi-info">
                    <div className="rmi-name">{r.name}</div>
                    <div className="rmi-meta">
                      <span>⭐ {r.rating}</span>
                      <span>📍 {r.distance || "~1 km"}</span>
                      <span>🕐 {r.deliveryTime} min</span>
                    </div>
                  </div>
                  <div className="rmi-price">₹{r.priceForTwo}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* GRID VIEW */}
      {view === "grid" && (
        <div className="rest-grid-container">
          {loading ? (
            <div className="rest-skeleton-grid">
              {[1,2,3,4,5,6].map(i => <div key={i} className="rest-skeleton" />)}
            </div>
          ) : (
            <div className="rest-grid">
              {filtered.map((r) => (
                <div
                  className="rest-card"
                  key={r.id}
                  onClick={() => navigate(`/restaurants/${r.id}`)}
                >
                  {/* card image */}
                  <div className="rest-card-img">
                    <span className="rest-card-emoji">{r.emoji}</span>
                    <div className="rest-card-rating">⭐ {r.rating}</div>
                    {r.offer && <div className="rest-card-offer">{r.offer}</div>}
                  </div>

                  {/* card body */}
                  <div className="rest-card-body">
                    <h3>{r.name}</h3>
                    <p className="rest-card-cuisine">{r.cuisine}</p>
                    <div className="rest-card-meta">
                      <span>🕐 {r.deliveryTime} min</span>
                      <span>💰 ₹{r.priceForTwo} for two</span>
                      {r.distance && <span>📍 {r.distance}</span>}
                    </div>
                    <button
                      className="rest-order-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/restaurants/${r.id}`);
                      }}
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Restaurants;