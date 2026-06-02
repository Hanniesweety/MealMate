import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./TableBooking.css";

const restaurantData = {
  "1": { name: "The Grand Spice", image: "🍛", location: "Anna Nagar, Chennai", rating: 4.8 },
  "2": { name: "Coastal Breeze", image: "🦐", location: "Adyar, Chennai", rating: 4.7 },
  "3": { name: "Pasta Paradise", image: "🍝", location: "Nungambakkam, Chennai", rating: 4.6 },
};

const timeSlots = [
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
  "02:00 PM", "07:00 PM", "07:30 PM", "08:00 PM",
  "08:30 PM", "09:00 PM", "09:30 PM",
];

const TableBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = restaurantData[id] || restaurantData["1"];

  const [form, setForm] = useState({
    date: "", time: "", guests: "2", name: "", phone: "", occasion: "", requests: "",
  });
  const [booked, setBooked] = useState(false);
  const [bookingId] = useState(`TBL${Math.floor(Math.random() * 90000) + 10000}`);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleBook = () => {
    if (!form.date || !form.time || !form.name || !form.phone) {
      alert("Please fill all required fields!");
      return;
    }
    setBooked(true);
  };

  // get today's date for min date
  const today = new Date().toISOString().split("T")[0];

  if (booked) {
    return (
      <div className="tb-page">
        <Navbar />
        <div className="tb-success">
          <div className="tb-success-card">
            <div className="tb-success-icon">🎉</div>
            <h2>Table Booked!</h2>
            <p>Your table has been reserved successfully</p>
            <div className="tb-booking-details">
              <div className="tb-booking-id">Booking ID: <strong>{bookingId}</strong></div>
              <div className="tb-detail-row"><span>🍽️ Restaurant</span><strong>{restaurant.name}</strong></div>
              <div className="tb-detail-row"><span>📅 Date</span><strong>{form.date}</strong></div>
              <div className="tb-detail-row"><span>🕐 Time</span><strong>{form.time}</strong></div>
              <div className="tb-detail-row"><span>👥 Guests</span><strong>{form.guests} people</strong></div>
              <div className="tb-detail-row"><span>📍 Location</span><strong>{restaurant.location}</strong></div>
            </div>
            <p className="tb-confirm-note">
              📱 Confirmation sent to <strong>{form.phone}</strong>
            </p>
            <div className="tb-success-btns">
              <button className="tb-btn-primary" onClick={() => navigate("/profile")}>
                View My Bookings
              </button>
              <button className="tb-btn-secondary" onClick={() => navigate("/dine-out")}>
                Explore More
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tb-page">
      <Navbar />

      {/* header */}
      <div className="tb-header">
        <div className="tb-header-inner">
          <button className="tb-back" onClick={() => navigate(-1)}>← Back</button>
          <div className="tb-restaurant-info">
            <div className="tb-restaurant-emoji">{restaurant.image}</div>
            <div>
              <h2>{restaurant.name}</h2>
              <p>📍 {restaurant.location} · ⭐ {restaurant.rating}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="tb-container">
        <div className="tb-form-section">
          <h2>Reserve Your Table 🍽️</h2>

          {/* date & guests */}
          <div className="tb-card">
            <h3>When are you coming?</h3>
            <div className="tb-row">
              <div className="tb-field">
                <label>Date *</label>
                <input
                  type="date" name="date"
                  min={today} value={form.date}
                  onChange={handleChange}
                />
              </div>
              <div className="tb-field">
                <label>Number of Guests *</label>
                <select name="guests" value={form.guests} onChange={handleChange}>
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? "Person" : "People"}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* time slots */}
          <div className="tb-card">
            <h3>Choose a Time *</h3>
            <div className="time-slots">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  className={`time-slot ${form.time === slot ? "active" : ""}`}
                  onClick={() => setForm({ ...form, time: slot })}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* personal details */}
          <div className="tb-card">
            <h3>Your Details</h3>
            <div className="tb-row">
              <div className="tb-field">
                <label>Full Name *</label>
                <input type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} />
              </div>
              <div className="tb-field">
                <label>Phone Number *</label>
                <input type="tel" name="phone" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} />
              </div>
            </div>
            <div className="tb-field" style={{marginTop:"1rem"}}>
              <label>Occasion (optional)</label>
              <select name="occasion" value={form.occasion} onChange={handleChange}>
                <option value="">Select occasion</option>
                <option>Birthday 🎂</option>
                <option>Anniversary 💑</option>
                <option>Business Dinner 💼</option>
                <option>Date Night 🌹</option>
                <option>Family Gathering 👨‍👩‍👧</option>
                <option>Just Dining 🍽️</option>
              </select>
            </div>
            <div className="tb-field" style={{marginTop:"1rem"}}>
              <label>Special Requests (optional)</label>
              <textarea
                name="requests" rows={3}
                placeholder="Dietary restrictions, seating preferences, celebrations..."
                value={form.requests} onChange={handleChange}
              />
            </div>
          </div>

          {/* summary */}
          <div className="tb-summary">
            <h3>Booking Summary</h3>
            <div className="tb-summary-row"><span>Restaurant</span><strong>{restaurant.name}</strong></div>
            <div className="tb-summary-row"><span>Date</span><strong>{form.date || "Not selected"}</strong></div>
            <div className="tb-summary-row"><span>Time</span><strong>{form.time || "Not selected"}</strong></div>
            <div className="tb-summary-row"><span>Guests</span><strong>{form.guests} people</strong></div>
            {form.occasion && <div className="tb-summary-row"><span>Occasion</span><strong>{form.occasion}</strong></div>}
            <button className="tb-book-btn" onClick={handleBook}>
              Confirm Booking 🍽️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableBooking;