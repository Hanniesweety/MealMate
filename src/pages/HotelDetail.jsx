import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { hotelsData } from "./Hotels";
import "./HotelDetail.css";

const roomsData = {
  "1": [
    {
      id: "r1", name: "Deluxe Room", price: 4500, size: "350 sq ft",
      beds: "1 King Bed", maxGuests: 2,
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
      amenities: ["🌡️ AC", "📺 TV", "🛁 Bathtub", "☕ Coffee", "📶 WiFi"],
      available: true,
    },
    {
      id: "r2", name: "Premium Suite", price: 8500, size: "650 sq ft",
      beds: "1 King + Sofa", maxGuests: 3,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
      amenities: ["🌡️ AC", "📺 Smart TV", "🛁 Jacuzzi", "🛋️ Living Area", "📶 WiFi"],
      available: true,
    },
    {
      id: "r3", name: "Presidential Suite", price: 15000, size: "1200 sq ft",
      beds: "2 King Beds", maxGuests: 4,
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80",
      amenities: ["🌡️ AC", "📺 Smart TV", "🛁 Jacuzzi", "🌅 Balcony", "📶 WiFi"],
      available: true,
    },
  ],
  "2": [
    {
      id: "r1", name: "Standard Room", price: 2200, size: "250 sq ft",
      beds: "1 Queen Bed", maxGuests: 2,
      image: "https://images.unsplash.com/photo-1587985064135-0366536eab42?w=600&q=80",
      amenities: ["🌡️ AC", "📺 TV", "☕ Coffee", "📶 WiFi"],
      available: true,
    },
    {
      id: "r2", name: "Executive Room", price: 3500, size: "320 sq ft",
      beds: "1 King Bed", maxGuests: 2,
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
      amenities: ["🌡️ AC", "📺 Smart TV", "💼 Work Desk", "📶 WiFi"],
      available: true,
    },
  ],
  "3": [
    {
      id: "r1", name: "Ocean View Room", price: 6800, size: "400 sq ft",
      beds: "1 King Bed", maxGuests: 2,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
      amenities: ["🌡️ AC", "🌊 Ocean View", "🛁 Bathtub", "📶 WiFi"],
      available: true,
    },
    {
      id: "r2", name: "Beach Cottage", price: 9500, size: "500 sq ft",
      beds: "1 King Bed", maxGuests: 2,
      image: "https://images.unsplash.com/photo-1439130490301-25e322d88054?w=600&q=80",
      amenities: ["🌡️ AC", "🏖️ Beach Access", "🌿 Garden", "📶 WiFi"],
      available: true,
    },
    {
      id: "r3", name: "Family Villa", price: 14000, size: "900 sq ft",
      beds: "2 King Beds", maxGuests: 6,
      image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&q=80",
      amenities: ["🌡️ AC", "🏊 Private Pool", "🍳 Kitchen", "📶 WiFi"],
      available: false,
    },
  ],
};

const reviewsData = [
  { name: "Karthik R.", rating: 5, comment: "Absolutely stunning property! The service was impeccable and the rooms were world-class.", date: "30 May 2026", avatar: "👨" },
  { name: "Meera S.", rating: 5, comment: "Best hotel experience in Chennai. The pool and spa were amazing!", date: "25 May 2026", avatar: "👩" },
  { name: "Arun V.", rating: 4, comment: "Great location and wonderful staff. Will definitely come back!", date: "20 May 2026", avatar: "👨" },
];

const amenitiesList = [
  { icon: "🏊", name: "Swimming Pool", desc: "Olympic-size heated pool open 6AM–10PM" },
  { icon: "💆", name: "Spa & Wellness", desc: "Full-service spa with massage and treatments" },
  { icon: "🍽️", name: "Fine Dining", desc: "Multi-cuisine restaurant open all day" },
  { icon: "🏋️", name: "Fitness Center", desc: "State-of-the-art gym with personal trainers" },
  { icon: "📶", name: "Free High-Speed WiFi", desc: "Complimentary WiFi throughout the property" },
  { icon: "🅿️", name: "Valet Parking", desc: "Complimentary valet parking for all guests" },
  { icon: "🚗", name: "Airport Transfer", desc: "24/7 airport pickup and drop service" },
  { icon: "🛎️", name: "24/7 Concierge", desc: "Round-the-clock assistance for all your needs" },
];

const HotelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("rooms");
  const [imgErrors, setImgErrors] = useState({});

  const hotel = hotelsData.find((h) => h.id === id) || hotelsData[0];
  const rooms = roomsData[id] || roomsData["1"];

  const handleImgError = (roomId) => {
    setImgErrors((prev) => ({ ...prev, [roomId]: true }));
  };

  return (
    <div className="hd-page">
      <Navbar />

      {/* Hero */}
      <div className="hd-hero">
        <div className="hd-hero-inner">
          <button className="hd-back" onClick={() => navigate(-1)}>
            ← Back to Hotels
          </button>
          <div className="hd-hotel-info">
            <div className="hd-emoji">{hotel.image}</div>
            <div className="hd-hotel-text">
              <div className="hd-type-badge">{hotel.type}</div>
              <h1>{hotel.name}</h1>
              <p className="hd-location">📍 {hotel.location}</p>
              <div className="hd-meta">
                <span>⭐ {hotel.rating} ({hotel.reviews} reviews)</span>
                <span>💰 From ₹{hotel.pricePerNight?.toLocaleString()}/night</span>
              </div>
              <div className="hd-amenities-row">
                {hotel.amenities?.map((a) => (
                  <span key={a} className="hd-amenity-tag">{a}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="hd-tabs-bar">
        <div className="hd-tabs-inner">
          {[
            { key: "rooms",     label: "🛏️ Rooms" },
            { key: "reviews",   label: "⭐ Reviews" },
            { key: "amenities", label: "✨ Amenities" },
          ].map((t) => (
            <button
              key={t.key}
              className={`hd-tab ${activeTab === t.key ? "active" : ""}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="hd-content">

        {/* ROOMS TAB */}
        {activeTab === "rooms" && (
          <div className="hd-rooms">
            <h2>Available Rooms</h2>
            <div className="rooms-grid">
              {rooms.map((room) => (
                <div
                  className={`room-card ${!room.available ? "room-card--unavailable" : ""}`}
                  key={room.id}
                >
                  {/* Image */}
                  <div className="room-card-img">
                    {imgErrors[room.id] ? (
                      <div className="room-img-fallback">🛏️</div>
                    ) : (
                      <img
                        src={room.image}
                        alt={room.name}
                        onError={() => handleImgError(room.id)}
                        loading="lazy"
                      />
                    )}
                    {!room.available && (
                      <div className="room-unavailable-badge">Not Available</div>
                    )}
                    <div className="room-price-badge">
                      ₹{room.price.toLocaleString()}<span>/night</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="room-card-body">
                    <h3>{room.name}</h3>
                    <div className="room-specs">
                      <span>📐 {room.size}</span>
                      <span>🛏️ {room.beds}</span>
                      <span>👥 Max {room.maxGuests}</span>
                    </div>
                    <div className="room-amenities-row">
                      {room.amenities.map((a) => (
                        <span key={a} className="room-amenity-tag">{a}</span>
                      ))}
                    </div>
                    <button
                      className="room-book-btn"
                      disabled={!room.available}
                      onClick={() =>
                        navigate(`/room-booking/${id}/${room.id}`, {
                          state: { hotel, room },
                        })
                      }
                    >
                      {room.available ? "Book This Room →" : "Not Available"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REVIEWS TAB */}
        {activeTab === "reviews" && (
          <div className="hd-reviews">
            <div className="hd-rating-summary">
              <div className="hd-rating-big">
                <span className="hd-rating-num">{hotel.rating}</span>
                <div>
                  <div className="hd-stars">{"⭐".repeat(Math.floor(hotel.rating))}</div>
                  <p>{hotel.reviews} verified reviews</p>
                </div>
              </div>
            </div>
            <div className="reviews-list">
              {reviewsData.map((r, i) => (
                <div className="hd-review-card" key={i}>
                  <div className="hd-review-top">
                    <div className="hd-review-avatar">{r.avatar}</div>
                    <div className="hd-review-meta">
                      <div className="hd-review-name">{r.name}</div>
                      <div className="hd-review-date">{r.date}</div>
                    </div>
                    <div className="hd-review-stars">{"⭐".repeat(r.rating)}</div>
                  </div>
                  <p className="hd-review-comment">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AMENITIES TAB */}
        {activeTab === "amenities" && (
          <div className="hd-amenities-tab">
            <h2>Hotel Amenities</h2>
            <div className="amenities-big-grid">
              {amenitiesList.map((a) => (
                <div className="amenity-big-card" key={a.name}>
                  <div className="amenity-big-icon">{a.icon}</div>
                  <div>
                    <h4>{a.name}</h4>
                    <p>{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default HotelDetail;
