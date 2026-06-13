import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./DineOut.css";

const restaurants = [
  {
    id: "1", name: "The Grand Spice", cuisine: "North Indian", rating: 4.8,
    reviews: 1240, priceForTwo: 800, type: "Fine Dining",
    location: "Anna Nagar", tags: ["Veg Friendly", "Rooftop"],
    openNow: true, waitTime: "No wait",
    image: "https://img.freepik.com/free-photo/indian-food-restaurant-table_23-2148765597.jpg?w=600",
  },
  {
    id: "2", name: "Coastal Breeze", cuisine: "Seafood", rating: 4.7,
    reviews: 890, priceForTwo: 1200, type: "Casual Dining",
    location: "Adyar", tags: ["Live Music", "Sea View"],
    openNow: true, waitTime: "15 min",
    image: "https://img.freepik.com/free-photo/seafood-restaurant-table_23-2148765598.jpg?w=600",
  },
  {
    id: "3", name: "Pasta Paradise", cuisine: "Italian", rating: 4.6,
    reviews: 654, priceForTwo: 1000, type: "Fine Dining",
    location: "Nungambakkam", tags: ["Couple Friendly", "Candlelight"],
    openNow: true, waitTime: "No wait",
    image: "https://img.freepik.com/free-photo/italian-restaurant-table_23-2148765599.jpg?w=600",
  },
  {
    id: "4", name: "Wok & Roll", cuisine: "Chinese", rating: 4.5,
    reviews: 432, priceForTwo: 600, type: "Casual Dining",
    location: "T Nagar", tags: ["Family Friendly", "Large Groups"],
    openNow: false, waitTime: "Closed",
    image: "https://img.freepik.com/free-photo/chinese-food-restaurant_23-2148765600.jpg?w=600",
  },
  {
    id: "5", name: "The BBQ Factory", cuisine: "Barbecue", rating: 4.9,
    reviews: 2100, priceForTwo: 1500, type: "Premium",
    location: "Velachery", tags: ["Unlimited BBQ", "Party Place"],
    openNow: true, waitTime: "30 min",
    image: "https://img.freepik.com/free-photo/barbecue-restaurant-grill_23-2148765601.jpg?w=600",
  },
  {
    id: "6", name: "Garden Cafe", cuisine: "Continental", rating: 4.4,
    reviews: 321, priceForTwo: 700, type: "Casual Dining",
    location: "Besant Nagar", tags: ["Outdoor Seating", "Pet Friendly"],
    openNow: true, waitTime: "No wait",
    image: "https://img.freepik.com/free-photo/outdoor-cafe-garden_23-2148765602.jpg?w=600",
  },
];

// fallback gradient per type
const typeBg = {
  "Fine Dining": "linear-gradient(135deg, #8B4513, #D2691E)",
  "Casual Dining": "linear-gradient(135deg, #276749, #48BB78)",
  "Premium": "linear-gradient(135deg, #553C9A, #9F7AEA)",
};
const typeEmoji = {
  "Fine Dining": "🍽️", "Casual Dining": "🥘", "Premium": "👑",
};

const filters = ["All", "Fine Dining", "Casual Dining", "Premium"];

const DineOut = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [imgErrors, setImgErrors] = useState({});
  const navigate = useNavigate();

  const filtered = restaurants.filter((r) => {
    const matchFilter = activeFilter === "All" || r.type === activeFilter;
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleImgError = (id) => setImgErrors(prev => ({ ...prev, [id]: true }));

  return (
    <div className="dineout-page">
      <Navbar />

      {/* HERO */}
      <div className="dineout-hero">
        <div className="dineout-hero-overlay" />
        <div className="dineout-hero-inner">
          <div className="dineout-badge">🍽️ Dine-Out Experience</div>
          <h1>Book a Table at the <span>Best Restaurants</span></h1>
          <p>Discover top restaurants, reserve your table instantly and enjoy a perfect dining experience</p>
          <div className="dineout-search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search restaurants, cuisines, locations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="dineout-filters">
        <div className="filters-inner">
          {filters.map((f) => (
            <button
              key={f}
              className={`filter-btn ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div className="dineout-container">
        <div className="dineout-count">{filtered.length} restaurants found</div>
        <div className="dineout-grid">
          {filtered.map((r) => (
            <div
              className="dineout-card"
              key={r.id}
              onClick={() => navigate(`/restaurants/${r.id}`)}
            >
              {/* IMAGE */}
              <div className="dineout-card-img">
                {imgErrors[r.id] ? (
                  <div
                    className="dineout-img-fallback"
                    style={{ background: typeBg[r.type] || typeBg["Casual Dining"] }}
                  >
                    <span className="dineout-fallback-emoji">
                      {typeEmoji[r.type] || "🍽️"}
                    </span>
                    <span className="dineout-fallback-name">{r.name}</span>
                  </div>
                ) : (
                  <img
                    src={r.image}
                    alt={r.name}
                    className="dineout-card-photo"
                    onError={() => handleImgError(r.id)}
                  />
                )}
                <div className="dineout-card-overlay" />
                <div className="dineout-type-badge">{r.type}</div>
                {!r.openNow && <div className="closed-badge">Closed</div>}
              </div>

              {/* BODY */}
              <div className="dineout-card-body">
                <div className="dineout-card-top">
                  <h3>{r.name}</h3>
                  <div className="dineout-rating">⭐ {r.rating}</div>
                </div>
                <p className="dineout-cuisine">{r.cuisine} · {r.location}</p>
                <div className="dineout-tags">
                  {r.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="dineout-meta">
                  <span>💰 ₹{r.priceForTwo} for two</span>
                  <span>⏱️ {r.waitTime}</span>
                </div>
                <div className="dineout-actions">
                  <button
                    className="view-menu-btn"
                    onClick={(e) => { e.stopPropagation(); navigate(`/restaurants/${r.id}`); }}
                  >
                    View Menu
                  </button>
                  <button
                    className="book-table-btn"
                    disabled={!r.openNow}
                    onClick={(e) => { e.stopPropagation(); navigate(`/table-booking/${r.id}`); }}
                  >
                    {r.openNow ? "Book Table" : "Closed"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DineOut;