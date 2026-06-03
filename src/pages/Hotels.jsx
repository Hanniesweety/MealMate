import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Hotels.css";

export const hotelsData = [
  {
    id: "1",
    name: "The Royal Beige",
    location: "Anna Nagar, Chennai",
    rating: 4.9,
    reviews: 2341,
    pricePerNight: 4500,
    image: "🏰",
    type: "Luxury",
    amenities: ["🏊 Pool", "🍽️ Restaurant", "💆 Spa", "🏋️ Gym", "🅿️ Parking"],
    tags: ["Rooftop Pool", "Fine Dining", "Business Center"],
    available: true,
    description: "Experience luxury at its finest with world-class amenities and impeccable service.",
  },
  {
    id: "2",
    name: "Comfort Inn Express",
    location: "T Nagar, Chennai",
    rating: 4.5,
    reviews: 1120,
    pricePerNight: 2200,
    image: "🏨",
    type: "Business",
    amenities: ["📶 Free WiFi", "🍳 Breakfast", "🅿️ Parking", "🏋️ Gym"],
    tags: ["Free Breakfast", "Airport Shuttle", "Meeting Rooms"],
    available: true,
    description: "Perfect for business travelers with modern amenities and central location.",
  },
  {
    id: "3",
    name: "Seaside Serenity Resort",
    location: "ECR, Chennai",
    rating: 4.8,
    reviews: 1876,
    pricePerNight: 6800,
    image: "🌴",
    type: "Resort",
    amenities: ["🏖️ Beach Access", "🏊 Pool", "🍽️ Restaurant", "🤿 Water Sports", "💆 Spa"],
    tags: ["Beachfront", "Water Sports", "Sunset Views"],
    available: true,
    description: "Escape to paradise with stunning ocean views and world-class resort facilities.",
  },
  {
    id: "4",
    name: "Budget Stay Plus",
    location: "Tambaram, Chennai",
    rating: 4.2,
    reviews: 654,
    pricePerNight: 1200,
    image: "🏠",
    type: "Budget",
    amenities: ["📶 Free WiFi", "🍳 Breakfast", "🅿️ Parking"],
    tags: ["Value for Money", "Clean Rooms", "Near Metro"],
    available: true,
    description: "Comfortable and affordable accommodation with all essential amenities.",
  },
  {
    id: "5",
    name: "Heritage Grand Palace",
    location: "Mylapore, Chennai",
    rating: 4.7,
    reviews: 987,
    pricePerNight: 5500,
    image: "🏛️",
    type: "Luxury",
    amenities: ["🏊 Pool", "🍽️ Restaurant", "💆 Spa", "🎭 Cultural Shows", "🅿️ Parking"],
    tags: ["Heritage Property", "Cultural Experience", "Fine Dining"],
    available: false,
    description: "Stay in a historic palace and experience the rich culture of Chennai.",
  },
  {
    id: "6",
    name: "Green Valley Boutique",
    location: "Adyar, Chennai",
    rating: 4.6,
    reviews: 432,
    pricePerNight: 3200,
    image: "🌿",
    type: "Boutique",
    amenities: ["🌿 Garden", "🍽️ Restaurant", "📶 Free WiFi", "🧘 Yoga"],
    tags: ["Eco-Friendly", "Garden View", "Yoga Classes"],
    available: true,
    description: "A sustainable boutique hotel surrounded by lush greenery and tranquility.",
  },
];

const filters = ["All", "Luxury", "Business", "Resort", "Budget", "Boutique"];

const Hotels = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const filtered = hotelsData.filter((h) => {
    const matchFilter = activeFilter === "All" || h.type === activeFilter;
    const matchSearch = h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.location.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="hotels-page">
      <Navbar />

      {/* hero search */}
      <div className="hotels-hero">
        <div className="hotels-hero-inner">
          <div className="hotels-badge">🏨 Find Your Perfect Stay</div>
          <h1>Luxury, Comfort & <span>Value</span> — All in One Place</h1>
          <p>Discover handpicked hotels, resorts and boutique stays across Chennai</p>

          <div className="hotels-search-bar">
            <div className="hsb-field">
              <label>📍 Location</label>
              <input
                type="text" placeholder="Where are you going?"
                value={search} onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="hsb-divider" />
            <div className="hsb-field">
              <label>📅 Check-In</label>
              <input type="date" min={today} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
            </div>
            <div className="hsb-divider" />
            <div className="hsb-field">
              <label>📅 Check-Out</label>
              <input type="date" min={checkIn || today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
            </div>
            <div className="hsb-divider" />
            <div className="hsb-field">
              <label>👥 Guests</label>
              <select value={guests} onChange={(e) => setGuests(e.target.value)}>
                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>)}
              </select>
            </div>
            <button className="hsb-search-btn">Search</button>
          </div>
        </div>
      </div>

      {/* filters */}
      <div className="hotels-filters">
        <div className="hotels-filters-inner">
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

      {/* hotels grid */}
      <div className="hotels-container">
        <div className="hotels-count">{filtered.length} hotels found</div>
        <div className="hotels-grid">
          {filtered.map((hotel) => (
            <div className="hotel-card" key={hotel.id} onClick={() => navigate(`/hotels/${hotel.id}`)}>
              <div className="hotel-card-img">
                <span className="hotel-emoji">{hotel.image}</span>
                <div className="hotel-type-badge">{hotel.type}</div>
                {!hotel.available && <div className="hotel-full-badge">Fully Booked</div>}
                <div className="hotel-price-badge">₹{hotel.pricePerNight.toLocaleString()}/night</div>
              </div>
              <div className="hotel-card-body">
                <div className="hotel-card-top">
                  <h3>{hotel.name}</h3>
                  <div className="hotel-rating">⭐ {hotel.rating}</div>
                </div>
                <p className="hotel-location">📍 {hotel.location}</p>
                <p className="hotel-desc">{hotel.description}</p>
                <div className="hotel-amenities">
                  {hotel.amenities.slice(0, 4).map((a) => (
                    <span key={a} className="amenity">{a}</span>
                  ))}
                </div>
                <div className="hotel-tags">
                  {hotel.tags.map((tag) => (
                    <span key={tag} className="htag">{tag}</span>
                  ))}
                </div>
                <div className="hotel-footer">
                  <div className="hotel-price-info">
                    <span className="hotel-price">₹{hotel.pricePerNight.toLocaleString()}</span>
                    <span className="hotel-per-night">per night</span>
                  </div>
                  <button
                    className="hotel-book-btn"
                    disabled={!hotel.available}
                    onClick={(e) => { e.stopPropagation(); navigate(`/hotels/${hotel.id}`); }}
                  >
                    {hotel.available ? "View Rooms" : "Fully Booked"}
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

export default Hotels;